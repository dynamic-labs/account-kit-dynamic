import React, { useState } from "react";
import SignMessage from "./alchemy/AlchemySignMessage.tsx";
import GaslessTransaction from "./alchemy/AlchemyTransaction.tsx";
import BatchTransaction from "./alchemy/AlchemyBatchTransaction.tsx";
import SessionKeys from "./alchemy/AlchemySessionKeys.tsx";
import { HStack, Button } from "@chakra-ui/react";

export default function MainViews({
  alchemyClient,
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
        {signMessageView && <SignMessage alchemyClient={alchemyClient} />}

        {sendTransactionView && (
          <GaslessTransaction alchemyClient={alchemyClient} chain={chain} />
        )}
      </div>

      <div>
        {batchTransactionView && (
          <BatchTransaction alchemyClient={alchemyClient} chain={chain} />
        )}
      </div>

      <div>
        {sessionKeysView && (
          <SessionKeys alchemyClient={alchemyClient} chain={chain} />
        )}
      </div>
    </div>
  );
}
