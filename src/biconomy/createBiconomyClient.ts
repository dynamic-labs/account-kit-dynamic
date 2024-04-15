import { useState, useEffect } from "react";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
} from "@biconomy/account";

import { type WalletClient } from "viem";

import { useClient } from "../providers/ClientProvider.tsx";

const useBiconomyClient = (chain) => {
  const { client } = useClient();
  const { primaryWallet, isAuthenticated } = useDynamicContext();
  const [localClient, setClient] = useState<BiconomySmartAccountV2 | null>(
    null
  );

  const bundlerUrl =
    "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
  const paymasterApiKey = process.env.BICONOMY_PAYMASTER_API_KEY;

  useEffect(() => {
    const initializeClient = async () => {
      const dynamicProvider =
        (await primaryWallet?.connector?.getWalletClient()) as WalletClient;

      if (!dynamicProvider) return;

      const dynamicSigner = await primaryWallet?.connector?.getSigner();

      let biconomyClient = await createSmartAccountClient({
        signer: dynamicSigner,
        bundlerUrl,
        biconomyPaymasterApiKey: paymasterApiKey,
        chainId: chain.id,
      });

      biconomyClient.provider = "Biconomy";

      console.log(biconomyClient);

      setClient(biconomyClient);
    };

    if (!client || client?.provider !== "Biconomy") {
      if (isAuthenticated && primaryWallet?.connector) initializeClient();
    }
  }, [client, primaryWallet, isAuthenticated]);

  return localClient;
};

export default useBiconomyClient;
