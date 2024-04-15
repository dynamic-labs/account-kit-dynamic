import { useEffect, useState } from "react";
import {
  WalletClientSigner,
  type SmartAccountSigner,
  type SmartAccountClient,
} from "@alchemy/aa-core";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { type WalletClient } from "viem";
import { useClient } from "../../providers/ClientProvider.tsx";

const useAlchemyClient = (chain) => {
  const { client } = useClient();
  const { primaryWallet, isAuthenticated } = useDynamicContext();
  const [localClient, setClient] = useState<SmartAccountClient | null>(null);

  useEffect(() => {
    const initializeClient = async () => {
      const dynamicProvider =
        (await primaryWallet?.connector?.getWalletClient()) as WalletClient;

      if (!dynamicProvider) return;

      const dynamicSigner: SmartAccountSigner = new WalletClientSigner(
        dynamicProvider,
        "dynamic" // signer type
      );

      const alchemyClient = ((client) => client)(
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

    if (!client || client?.provider !== "Alchemy") {
      if (isAuthenticated && primaryWallet?.connector) initializeClient();
    }
  }, [client, primaryWallet, isAuthenticated]);

  return localClient;
};

export default useAlchemyClient;
