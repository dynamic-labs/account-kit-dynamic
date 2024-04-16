import React, { useEffect } from "react";

import useCreateSessionKeys from "../utils/sessionKeys.ts";
import userOpWithSessionKeys from "../utils/userOpWithSessionKeys.ts";

import { Box, VStack, HStack, Input, Button } from "@chakra-ui/react";
import { useClient } from "../providers/ClientProvider.tsx";

const SessionKeys: React.FC<any> = () => {
  const { client } = useClient();
  const [sessionKeysClient, setSessionKeysClient] = React.useState(null);
  const [sendingTransaction, setSendingTransaction] = React.useState(false);

  const localSessionKeysClient = useCreateSessionKeys(client);

  useEffect(() => {
    const createSessionKeysClient = async () => {
      localSessionKeysClient.provider = client?.provider;
      setSessionKeysClient(localSessionKeysClient);
    };

    createSessionKeysClient();
  }, [client]);

  const handleSendSessionKeyUserOp = async (recipient, amount) => {
    try {
      setSendingTransaction(true);
      console.log("attempting to send userop");
      await userOpWithSessionKeys(sessionKeysClient, recipient, amount);
      console.log("userop sent");
      setSendingTransaction(false);
    } catch (e) {
      console.error(e);
      setSendingTransaction(false);
    }
  };
  return (
    <Box>
      <VStack>
        <h2>Send with a session key</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <HStack>
            <Input placeholder="Recipient" type="text" id="recipient" />
            <Input placeholder="Amount" type="text" id="amount" />
            <Button
              onClick={() => {
                const recipientElement = document.getElementById("recipient");
                const amountElement = document.getElementById("amount");
                if (recipientElement && amountElement) {
                  handleSendSessionKeyUserOp(
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

export default SessionKeys;
