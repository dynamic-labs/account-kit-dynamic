const alchemySendTransaction = async (client, recipient, amount) =>
  await client.sendTransaction({ to: recipient, amount: amount });

const biconomySendTransaction = async (client, recipient, amount) => {
  try {
    return await client.sendTransaction({ to: recipient, amount });
  } catch (e) {
    console.error(e);
  }
};

const clientHooks = {
  Alchemy: alchemySendTransaction,
  Biconomy: biconomySendTransaction,
};

const signMessage = (client, recipient, amount) => {
  const ClientHook = clientHooks[client.provider];
  return ClientHook ? ClientHook(client, recipient, amount) : null;
};

export default signMessage;
