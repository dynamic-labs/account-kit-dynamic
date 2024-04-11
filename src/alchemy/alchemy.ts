import { useEffect, useState } from "react";
import {
  WalletClientSigner,
  type SmartAccountSigner,
  type SmartAccountClient,
} from "@alchemy/aa-core";

import { sessionKeyPluginActions } from "@alchemy/aa-accounts";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { type WalletClient } from "viem";

const useAlchemyClient = (shouldExtendWithSessionKeys, chain) => {
  const { primaryWallet, isAuthenticated } = useDynamicContext();
  const [client, setClient] = useState<SmartAccountClient | null>(null);

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    console.log("primaryWallet", primaryWallet);
    console.log("shouldExtendWithSessionKeys", shouldExtendWithSessionKeys);
    const initializeClient = async () => {
      // console.log(
      //   "initializeClient",
      //   "shouldExtendWithSessionKeys",
      //   shouldExtendWithSessionKeys
      // );

      console.log(primaryWallet?.connector);
      const dynamicProvider =
        (await primaryWallet?.connector?.getWalletClient()) as WalletClient;

      const dynamicSigner: SmartAccountSigner = new WalletClientSigner(
        dynamicProvider,
        "dynamic" // signer type
      );

      // console.log("dynamicSigner", dynamicSigner);
      // console.log("dynamicProvider", dynamicProvider);

      const alchemyClient = ((client) =>
        shouldExtendWithSessionKeys
          ? client.extend(sessionKeyPluginActions)
          : client)(
        await createModularAccountAlchemyClient({
          apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
          chain,
          signer: dynamicSigner,
          useSimulation: true,
          gasManagerConfig: {
            policyId: process.env.REACT_APP_ALCHEMY_GAS_POLICY_ID || "",
          },
        })
      );

      setClient(alchemyClient);
    };

    if (isAuthenticated && primaryWallet?.connector) initializeClient();
  }, [isAuthenticated, primaryWallet, shouldExtendWithSessionKeys]);

  return client;
};

export default useAlchemyClient;
