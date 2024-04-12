import { useEffect, useState } from "react";
import {
  WalletClientSigner,
  type SmartAccountSigner,
  type SmartAccountClient,
} from "@alchemy/aa-core";

// import { sessionKeyPluginActions } from "@alchemy/aa-accounts";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { type WalletClient } from "viem";

const useAlchemyClient = (chain) => {
  const { primaryWallet, isAuthenticated } = useDynamicContext();
  const [client, setClient] = useState<SmartAccountClient | null>(null);

  useEffect(() => {
    const initializeClient = async () => {
      const dynamicProvider =
        (await primaryWallet?.connector?.getWalletClient()) as WalletClient;

      if (!dynamicProvider) return;

      const dynamicSigner: SmartAccountSigner = new WalletClientSigner(
        dynamicProvider,
        "dynamic" // signer type
      );

      const alchemyClient = ((client) =>
        // shouldExtendWithSessionKeys
        //   ? client.extend(sessionKeyPluginActions)
        client)(
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

      alchemyClient.provider = "Alchemy";

      setClient(alchemyClient);
    };

    if (isAuthenticated && primaryWallet?.connector) initializeClient();
  }, [isAuthenticated, primaryWallet]);

  return client;
};

export default useAlchemyClient;
