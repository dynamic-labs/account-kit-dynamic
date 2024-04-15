import React, { useState } from "react";
import sendTransaction from "../utils/sendTransaction.ts";

import { VStack, HStack, Box, Button, Input } from "@chakra-ui/react";

const SendTransaction: React.FC<any> = ({ client }) => {
  const [sendingTransaction, setSendingTransaction] = useState(false);

  const processTransaction = async (recipient, amount) => {
    try {
      setSendingTransaction(true);
      await sendTransaction(client, recipient, amount);
      setSendingTransaction(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      <VStack>
        <h2>Send your gasless transaction</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <HStack>
            <Input placeholder="Recipient" type="text" id="recipient" />
            <Input placeholder="Amount" type="text" id="amount" />
            <Button
              onClick={() => {
                const recipientElement = document.getElementById("recipient");
                const amountElement = document.getElementById("amount");
                if (recipientElement && amountElement) {
                  processTransaction(
                    recipientElement.value,
                    amountElement.value
                  );
                }
              }}
              type="submit"
            >
              Send
            </Button>
          </HStack>
        </form>
        {sendingTransaction && <p>Sending transaction...</p>}
      </VStack>
    </Box>
  );
};

export default SendTransaction;
