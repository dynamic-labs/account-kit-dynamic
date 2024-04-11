import React, { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import {
  BiconomySmartAccountV2,
  DEFAULT_SESSION_KEY_MANAGER_MODULE,
  createSessionKeyManagerModule,
} from "@biconomy/account";
import {
  hexDataSlice,
  id,
  BytesLike,
  hexConcat,
  hexZeroPad,
  hexlify,
  parseEther,
} from "ethers/lib/utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



interface props {
  smartAccount: BiconomySmartAccountV2;
  address: string;
  provider: ethers.providers.Provider;
}

export interface Rule {
  offset: number;
  condition: number;
  referenceValue: string | BytesLike;
}

export interface Permission {
  destContract: string;
  functionSelector: string;
  valueLimit: BigNumber;
  rules: Rule[];
}

const CreateSession: React.FC<props> = ({
  smartAccount,
  address,
  provider,
}) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isSessionKeyModuleEnabled, setIsSessionKeyModuleEnabled] =
    useState(false);

  useEffect(() => {
    let checkSessionModuleEnabled = async () => {
      if (!address || !smartAccount || !provider) {
        setIsSessionKeyModuleEnabled(false);
        return;
      }
      try {
        const isEnabled = await smartAccount.isModuleEnabled(
          DEFAULT_SESSION_KEY_MANAGER_MODULE
        );
        console.log("isSessionKeyModuleEnabled", isEnabled);
        setIsSessionKeyModuleEnabled(isEnabled);
        return;
      } catch (err: any) {
        console.error(err);
        setIsSessionKeyModuleEnabled(false);
        return;
      }
    };
    checkSessionModuleEnabled();
  }, [isSessionKeyModuleEnabled, address, smartAccount, provider]);

  async function getABISVMSessionKeyData(
    sessionKey: string,
    permission: Permission
  ): Promise<string> {
    let sessionKeyData = hexConcat([
      sessionKey,
      permission.destContract,
      permission.functionSelector,
      hexZeroPad(permission.valueLimit.toHexString(), 16),
      hexZeroPad(hexlify(permission.rules.length), 2), // this can't be more 2**11 (see below), so uint16 (2 bytes) is enough
    ]);

    for (let i = 0; i < permission.rules.length; i++) {
      sessionKeyData = hexConcat([
        sessionKeyData,
        hexZeroPad(hexlify(permission.rules[i].offset), 2), // offset is uint16, so there can't be more than 2**16/32 args = 2**11
        hexZeroPad(hexlify(permission.rules[i].condition), 1), // uint8
        permission.rules[i].referenceValue,
      ]);
    }
    return sessionKeyData;
  }

  const createSession = async (enableSessionKeyModule: boolean) => {
    toast.info("Creating Session...", {
      position: "top-right",
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    if (!address || !smartAccount || !provider) {
      alert("Please connect wallet first");
    }
    try {
      // Address of ABI Session Validation Module
      const abiSVMAddress = "0x000006bC2eCdAe38113929293d241Cf252D91861";
      // -----> setMerkle tree tx flow
      // create dapp side session key


      const sessionSigner = ethers.Wallet.createRandom();


      const sessionKeyEOA = await sessionSigner.getAddress();
      console.log("sessionKeyEOA", sessionKeyEOA);
      // BREWARE JUST FOR DEMO: update local storage with session key
      window.localStorage.setItem("sessionPKey", sessionSigner.privateKey);

      // generate sessionModule
      const sessionModule = await createSessionKeyManagerModule({
        moduleAddress: DEFAULT_SESSION_KEY_MANAGER_MODULE,
        smartAccountAddress: address,
      });

      const nftAddress = "0xdd526eba63ef200ed95f0f0fb8993fe3e20a23d0";
      const recipient = "0xAddress";
      // get only first 4 bytes for function selector
      const functionSelector = hexDataSlice(id("safeMint(address)"), 0, 4);

      // create session key data
      const sessionKeyData = await getABISVMSessionKeyData(sessionKeyEOA, {
        destContract: nftAddress, // destination contract to call
        functionSelector: functionSelector, // function selector allowed
        valueLimit: parseEther("0"), // no native value is sent
        // In rules, we make sure that referenceValue is equal to recipient
        rules: [
          {
            offset: 0, // defines the position of a 32bytes word in the calldata (our recipient address)
            condition: 0, // 0 = Condition.EQUAL
            referenceValue: ethers.utils.hexZeroPad(recipient, 32), // recipient address
          },
        ],
      });

      const sessionTxData = await sessionModule.createSessionData([
        {
          validUntil: 0,
          validAfter: 0,
          sessionValidationModule: abiSVMAddress,
          sessionPublicKey: sessionKeyEOA as `0x${string}`,
          sessionKeyData: sessionKeyData as `0x${string}`,
        },
      ]);
      console.log("sessionTxData", sessionTxData);

      // tx to set session key
      const setSessiontrx = {
        to: DEFAULT_SESSION_KEY_MANAGER_MODULE, // session manager module address
        data: sessionTxData.data,
      };

      const transactionArray = [];

      if (enableSessionKeyModule) {
        // -----> enableModule session manager module
        const enableModuleTrx = await smartAccount.getEnableModuleData(
          DEFAULT_SESSION_KEY_MANAGER_MODULE
        );
        transactionArray.push(enableModuleTrx);
      }

      transactionArray.push(setSessiontrx);

      let userOpResponse = await smartAccount.sendTransaction(transactionArray);

      console.log(`userOp Hash: ${userOpResponse.userOpHash}`);
      const transactionDetails = await userOpResponse.wait();
      console.log("txHash", transactionDetails.receipt.transactionHash);
      setIsSessionActive(true);
      toast.success(`Success! Session created succesfully`, {
        position: "top-right",
        autoClose: 18000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
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
      {isSessionKeyModuleEnabled ? (
        <button onClick={() => createSession(false)}>Create Session</button>
      ) : (
        <button onClick={() => createSession(true)}>
          Enable and Create Session
        </button>
      )}
    </div>
  );
};

export default CreateSession;
