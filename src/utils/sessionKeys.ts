import { type SmartAccountClient } from "@alchemy/aa-core";

import createAlchemySessionKeysClient from "../utils/alchemy/createAlchemySessionKeys.ts";

const alchemySessionKeys = async (client) => {
  const sessionKeysClient: SmartAccountClient | null =
    await createAlchemySessionKeysClient(client);

  return sessionKeysClient;
};

const biconomySessionKeys = async (client) => {};

const clientHooks = {
  Alchemy: alchemySessionKeys,
  Biconomy: biconomySessionKeys,
};

const createSessionKeys = (client) => {
  const ClientHook = clientHooks[client.provider];
  return ClientHook ? ClientHook(client) : null;
};

export default createSessionKeys;
