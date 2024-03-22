import { useEffect, useState } from "react";
import {
  WalletClientSigner,
  type SmartAccountSigner,
  type SmartAccountClient,
} from "@alchemy/aa-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { sepolia } from "@alchemy/aa-core";
import { type WalletClient } from "viem";

const useAlchemyClient = () => {
  const { primaryWallet, isAuthenticated } = useDynamicContext();
  const [client, setClient] = useState<SmartAccountClient | null>(null);

  useEffect(() => {
    const initializeClient = async () => {
      console.log("Initializing Alchemy client");
      const dynamicProvider =
        (await primaryWallet?.connector?.getWalletClient()) as WalletClient;

      console.log("dynamicProvider", dynamicProvider);

      const dynamicSigner: SmartAccountSigner = new WalletClientSigner(
        dynamicProvider,
        "dynamic" // signer type
      );
      const chain = sepolia;

      const alchemyClient = await createModularAccountAlchemyClient({
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        chain,
        signer: dynamicSigner,
        gasManagerConfig: {
          policyId: process.env.REACT_APP_ALCHEMY_GAS_POLICY_ID || "",
        },
      });

      setClient(alchemyClient);
    };

    if (isAuthenticated && primaryWallet?.connector) initializeClient();
  }, [isAuthenticated, primaryWallet]);

  return client;
};

export default useAlchemyClient;
