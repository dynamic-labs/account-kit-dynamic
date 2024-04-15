import React from "react";
import { ethers } from "ethers";
import {
  BiconomySmartAccountV2,
  DEFAULT_SESSION_KEY_MANAGER_MODULE,
  createSessionKeyManagerModule,
} from "@biconomy/account";
import nftAbi from "@/utils/nftAbi.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface props {
  smartAccount: BiconomySmartAccountV2;
  provider: ethers.providers.Provider;
  address: string;
}

const NFTMint: React.FC<props> = ({ smartAccount, provider, address }) => {
  const mintNft = async () => {
    if (!address || !smartAccount || !address) {
      alert("Please connect wallet first");
      return;
    }
    try {
      toast.info("Minting an NFT", {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const abiSVMAddress = "0x000006bC2eCdAe38113929293d241Cf252D91861";
      // get session key from local storage
      const sessionKeyPrivKey = window.localStorage.getItem("sessionPKey");
      console.log("sessionKeyPrivKey", sessionKeyPrivKey);
      if (!sessionKeyPrivKey) {
        alert("Session key not found please create session");
        return;
      }
      const sessionSigner = new ethers.Wallet(sessionKeyPrivKey, provider);
      console.log("sessionSigner", sessionSigner);

      // generate sessionModule
      const sessionModule = await createSessionKeyManagerModule({
        moduleAddress: DEFAULT_SESSION_KEY_MANAGER_MODULE,
        smartAccountAddress: address,
      });

      // set active module to sessionModule
      smartAccount = smartAccount.setActiveValidationModule(sessionModule);

      const nftAddress = "0xdd526eba63ef200ed95f0f0fb8993fe3e20a23d0";
      const recipient = "0xAddress";
      const nftContract = new ethers.Contract(nftAddress, nftAbi, provider);

      const { data } = await nftContract.populateTransaction.safeMint(
        recipient
      );

      // generate tx data
      const tx = {
        to: nftAddress,
        data: data!,
      };

      // This will build the tx into a user op and send it.
      let userOpResponse = await smartAccount.sendTransaction(tx, {
        params: {
          sessionSigner: sessionSigner,
          sessionValidationModule: abiSVMAddress,
        },
      });

      console.log("userOpHash", userOpResponse);
      const { receipt } = await userOpResponse.wait(1);
      console.log("txHash", receipt.transactionHash);
      const polygonScanlink = `https://mumbai.polygonscan.com/tx/${receipt.transactionHash}`;
      toast.success(
        <a target="_blank" href={polygonScanlink}>
          Success Click to view transaction
        </a>,
        {
          position: "top-right",
          autoClose: 18000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <button onClick={mintNft}>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <button onClick={mintNft}>Mint NFT</button>
      </div>
    </button>
  );
};

export default NFTMint;
