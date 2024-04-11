import { type SmartAccountClient } from "@alchemy/aa-core";

import useSessionKeys from "./useSessionKeys.ts";

const SessionKeys: React.FC<any> = ({ alchemyClient, chain }) => {
  const sessionKeysClient: SmartAccountClient | null = useSessionKeys(
    alchemyClient,
    chain
  );

  const handleSendSessionKeyUserOp = async () => {
    if (!sessionKeysClient) {
      console.log("Session keys client not initialized", sessionKeysClient);
      return;
    }

    const address = sessionKeysClient.getAddress(sessionKeysClient);
    console.log("address", address);

    const result = await sessionKeysClient.executeWithSessionKey({
      args: [[{ target: "0x1234", value: 1n, data: "0x" }], address],
    });
  };

  return (
    <>
      <button onClick={() => handleSendSessionKeyUserOp()}>
        Send userop with Session key
      </button>
    </>
  );
};

export default SessionKeys;
