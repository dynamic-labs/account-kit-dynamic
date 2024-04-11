import {
  SessionKeyAccessListType,
  SessionKeyPermissionsBuilder,
  SessionKeyPlugin,
  sessionKeyPluginActions,
  SessionKeySigner,
} from "@alchemy/aa-accounts";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { useEffect, useState } from "react";

const useSessionKeys = (client, chain) => {
  const [sessionKeyClient, setSessionKeyClient] = useState<any>(null);
  const createClient = async (client, chain) => {
    const sessionKeySigner = new SessionKeySigner();
    // 1. check if the plugin is installed
    const isPluginInstalled = await client
      .getInstalledPlugins({})
      // This checks using the default address for the chain, but you can always pass in your own plugin address here as an override
      .then((x) => x.includes(SessionKeyPlugin.meta.addresses[chain.id]));

    // 2. if the plugin is not installed, then install it and set up the session key
    if (!isPluginInstalled) {
      // lets create an initial permission set for the session key giving it an eth spend limit
      const initialPermissions = new SessionKeyPermissionsBuilder()
        .setNativeTokenSpendLimit({
          spendLimit: 10000n,
        })
        // this will allow the session key plugin to interact with all addresses
        .setContractAccessControlType(SessionKeyAccessListType.ALLOW_ALL_ACCESS)
        .setTimeRange({
          validFrom: Math.round(Date.now() / 1000),
          // valid for 1 hour
          validUntil: Math.round(Date.now() / 1000 + 60 * 60),
        });

      const { hash } = await client.installSessionKeyPlugin({
        // 1st arg is the initial set of session keys
        // 2nd arg is the tags for the session keys
        // 3rd arg is the initial set of permissions
        args: [
          [await sessionKeySigner.getAddress()],
          [
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          ],
          [initialPermissions.encode()],
        ],
      });

      await client.waitForUserOperationTransaction({ hash });
    }

    // 3. set up a client that's using our session key
    const sessionKeyClient = (
      await createModularAccountAlchemyClient({
        chain,
        signer: sessionKeySigner,
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        // this is important because it tells the client to use our previously deployed account
        accountAddress: client.getAddress(),
      })
    ).extend(sessionKeyPluginActions);

    setSessionKeyClient(sessionKeyClient);
  };

  useEffect(() => {
    if (client?.addSessionKey) {
      console.log("alchemy client with plugin functionality");

      createClient(client, chain);
    }
  }, [client, chain]);

  return sessionKeyClient;
};

export default useSessionKeys;
