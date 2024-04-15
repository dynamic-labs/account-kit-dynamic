const alchemyOpWithSessionKeys = async (
  sessionKeysClient,
  recipient,
  amount
) => {
  if (!sessionKeysClient) {
    console.log("Session keys client not initialized", sessionKeysClient);
    return;
  }

  const address = sessionKeysClient.getAddress(sessionKeysClient);

  const wei = amount * 1e18; // Convert ether to wei
  const weiBigInt = BigInt(Math.round(wei));

  const result = await sessionKeysClient.executeWithSessionKey({
    args: [[{ target: recipient, value: weiBigInt, data: "0x" }], address],
  });

  console.log(result);
  return;
};

const biconomyOpWithSessionKeys = async (client) => {};

const clientHooks = {
  Alchemy: alchemyOpWithSessionKeys,
  Biconomy: biconomyOpWithSessionKeys,
};

const createSessionKeys = (client, recipient, amount) => {
  const ClientHook = clientHooks[client.provider];
  return ClientHook ? ClientHook(client, recipient, amount) : null;
};

export default createSessionKeys;
