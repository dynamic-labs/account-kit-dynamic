import React, { useState } from "react";
const [address, setAddress] = useState<string>("");
const [loading, setLoading] = useState<boolean>(false);
const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2 | null>(
  null
);
const [provider, setProvider] = useState<ethers.providers.Provider | null>(
  null
);

const bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
const paymasterApiKey = "paymasterApiKey";

const createBiconomyClient = async () => {
  // @ts-ignore
  const { ethereum } = window;
  try {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setProvider(provider);
    let biconomySmartAccount = await createSmartAccountClient({
      signer,
      bundlerUrl,
      biconomyPaymasterApiKey: paymasterApiKey,
    });

    setLoading(false);
  } catch (error) {
    console.error(error);
  }
};
