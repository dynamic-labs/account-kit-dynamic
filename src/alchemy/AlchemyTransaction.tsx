import { parseEther } from "viem";
import React, { useState } from "react";

const GaslessTransaction: React.FC<any> = ({ alchemyClient, chain }) => {
  const [sendingTransaction, setSendingTransaction] = useState(false);

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
      const eligibility = await alchemyClient.checkGasSponsorshipEligibility(
        transaction
      );

      setSendingTransaction(true);
      const txHash = await alchemyClient.sendTransaction(transaction);

      console.log(
        `User operation included: https://${chain.name.toLowerCase()}.etherscan.io/tx/${txHash}`
      );
      setSendingTransaction(false);
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
      {sendingTransaction && <p>Sending transaction...</p>}
    </div>
  );
};

export default GaslessTransaction;
