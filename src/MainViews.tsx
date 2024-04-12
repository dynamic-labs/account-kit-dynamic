import React, { useState } from "react";
import SignMessage from "./views/SignMessage.tsx";
import GaslessTransaction from "./alchemy/AlchemyTransaction.tsx";
import BatchTransaction from "./alchemy/AlchemyBatchTransaction.tsx";
import SessionKeys from "./alchemy/AlchemySessionKeys.tsx";
import { HStack, Button } from "@chakra-ui/react";

export default function MainViews({
  provider,
  client,
  chain,
  setViewOpen,
  viewOpen,
}): JSX.Element {
  const [sendTransactionView, setSendTransactionView] =
    useState<boolean>(false);
  const [batchTransactionView, setBatchTransactionView] =
    useState<boolean>(false);
  const [sessionKeysView, setSessionKeysView] = useState<boolean>(false);
  const [signMessageView, setSignMessageView] = useState<boolean>(false);

  return (
    <div>
      {viewOpen && <Button onClick={() => setViewOpen(!viewOpen)}>Back</Button>}
      {!viewOpen && (
        <HStack>
          {!signMessageView && (
            <Button
              onClick={() => {
                setViewOpen(!viewOpen);
                setSignMessageView(!signMessageView);
              }}
            >
              Sign message
            </Button>
          )}

          {!sendTransactionView && (
            <Button
              onClick={() => {
                setViewOpen(!viewOpen);
                setSendTransactionView(!sendTransactionView);
              }}
            >
              Send transaction
            </Button>
          )}

          {!batchTransactionView && (
            <Button
              onClick={() => {
                setViewOpen(!viewOpen);
                setBatchTransactionView(!batchTransactionView);
              }}
            >
              Send batch transactions
            </Button>
          )}

          {!sessionKeysView && (
            <Button
              onClick={() => {
                setViewOpen(!viewOpen);
                setSessionKeysView(!sessionKeysView);
              }}
            >
              Session keys
            </Button>
          )}
        </HStack>
      )}

      <div>
        {signMessageView && <SignMessage client={client} />}

        {sendTransactionView && (
          <GaslessTransaction client={client} chain={chain} />
        )}
      </div>

      <div>
        {batchTransactionView && (
          <BatchTransaction client={client} chain={chain} />
        )}
      </div>

      <div>
        {sessionKeysView && <SessionKeys client={client} chain={chain} />}
      </div>
    </div>
  );
}
