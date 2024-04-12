const alchemySignMessage = async (client, message) =>
  await client.signMessage({ message: message });

const biconomySignMessage = async (client, message) =>
  await client.signMessage({ message: message });

const clientHooks = {
  Alchemy: alchemySignMessage,
  Biconomy: biconomySignMessage,
};

const signMessage = (client, message) => {
  const ClientHook = clientHooks[client.provider];
  return ClientHook ? ClientHook(client, message) : null;
};

export default signMessage;
