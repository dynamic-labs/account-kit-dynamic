import React from "react";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
} from "@biconomy/account";
import { ethers } from "ethers";

export default function SessionKeys() {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(
    null
  );

  const bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";
  const paymasterApiKey = "paymasterApiKey";

  const connect = async () => {
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
      setAddress(await biconomySmartAccount.getAccountAddress());
      setSmartAccount(biconomySmartAccount);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Session Keys Demo</h1>
      <h2>
        Connect and transfer ERC20 tokens without signing on each transfer
      </h2>
      {!loading && !address && (
        <button onClick={connect} className={styles.connect}>
          Connect to Web3
        </button>
      )}
      {loading && <p>Loading Smart Account...</p>}
      {address && <h2>Smart Account: {address}</h2>}
    </div>
  );
}
