import React from "react";
import SignMessage from "./views/SignMessage.tsx";
import SendTransaction from "./views/SendTransaction.tsx";
import SendBatchTransaction from "./views/BatchTransactions.tsx";
import SessionKeys from "./views/SessionKeys.tsx";

import { useClient } from "./providers/ClientProvider.tsx";

import { Box, VStack, HStack, Button } from "@chakra-ui/react";

export default function MainViews({
  chain,
  setCurrentViewOpen,
  currentViewOpen,
}): JSX.Element {
  const { client } = useClient();

  return (
    <Box>
      <VStack marginTop="-10rem">
        {currentViewOpen && (
          <Button marginY={12} onClick={() => setCurrentViewOpen(null)}>
            Back
          </Button>
        )}
        {!currentViewOpen && (
          <HStack>
            <Button
              onClick={() => {
                setCurrentViewOpen("Sign message");
              }}
            >
              Sign message
            </Button>

            <Button
              onClick={() => {
                setCurrentViewOpen("Send transaction");
              }}
            >
              Send transaction
            </Button>

            <Button
              onClick={() => {
                setCurrentViewOpen("Batch transaction");
              }}
            >
              Send batch transactions
            </Button>

            <Button
              onClick={() => {
                setCurrentViewOpen("Session keys");
              }}
            >
              Session keys
            </Button>
          </HStack>
        )}
      </VStack>

      <Box>
        {currentViewOpen && (
          <div>
            {currentViewOpen === "Sign message" && <SignMessage />}

            {currentViewOpen === "Send transaction" && (
              <SendTransaction client={client} chain={chain} />
            )}

            {currentViewOpen === "Batch transaction" && (
              <SendBatchTransaction client={client} chain={chain} />
            )}

            {currentViewOpen === "Session keys" && (
              <SessionKeys client={client} chain={chain} />
            )}
          </div>
        )}
      </Box>
    </Box>
  );
}
