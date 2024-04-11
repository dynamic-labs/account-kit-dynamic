import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { createSmartAccountClient } from "@biconomy/account";

// Your configuration with private key and Biconomy API key
const config = {
  privateKey: "your-private-key",
  bundlerUrl: "", // <-- Read about this at https://docs.biconomy.io/dashboard#bundler-url
};

// Generate EOA from private key using ethers.js
const account = privateKeyToAccount("0x" + config.privateKey);
const client = createWalletClient({
  account,
  chain: polygonMumbai,
  transport: http(),
});

// Create Biconomy Smart Account instance
const smartWallet = await createSmartAccountClient({
  signer: client,
  bundlerUrl: config.bundlerUrl,
});

const saAddress = await smartWallet.getAccountAddress();
console.log("SA Address", saAddress);
