import { parseEther } from "viem";
import React from "react";

const Transaction: React.FC<any> = ({ alchemyClient }) => {
  const sendTransaction = async (
    recipient: string,
    amount: string
  ): Promise<void> => {
    const transaction = {
      to: recipient,
      data: "0x",
      value: parseEther(amount),
    };

    try {
      const txHash = await alchemyClient.sendTransaction(transaction);

      console.log(
        `User operation included: https://sepolia.etherscan.io/tx/${txHash}`
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2>Send your gasless transaction</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Recipient:
          <input type="text" id="recipient" />
        </label>
        <label>
          Amount:
          <input type="text" id="amount" />
        </label>
        <button
          onClick={() => {
            const recipientElement = document.getElementById("recipient");
            const amountElement = document.getElementById("amount");
            if (recipientElement && amountElement) {
              sendTransaction(recipientElement.value, amountElement.value);
            }
          }}
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Transaction;
