import { type SmartAccountClient } from "@alchemy/aa-core";

import createAlchemySessionKeysClient from "../utils/alchemy/createAlchemySessionKeys.ts";
import createBiconomySessionKeysClient from "../utils/biconomy/createBiconomySessionKeys.ts";

const alchemySessionKeys = async (client) => {
  const sessionKeysClient: SmartAccountClient | null =
    await createAlchemySessionKeysClient(client);

  return sessionKeysClient;
};

const biconomySessionKeys = async (client) => {
  const sessionKeysClient: SmartAccountClient | null =
    await createBiconomySessionKeysClient(client);

  return sessionKeysClient;
};

const clientHooks = {
  Alchemy: alchemySessionKeys,
  Biconomy: biconomySessionKeys,
};

function useCreateSessionKeys(client) {
  const ClientHook = clientHooks[client.provider];
  return ClientHook ? ClientHook(client) : null;
}

export default useCreateSessionKeys;
