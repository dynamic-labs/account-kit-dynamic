import { useState, useEffect } from "react";

async function alchemyGetAddressAndBalance(client, setBalance, setAddress) {
  const address = client.account.address;
  setAddress(address);
  const balance = await client.getBalance({ address });
  setBalance(balance);
}

async function biconomyGetAddressAndBalance(client, setBalance, setAddress) {
  const address = await client.getAccountAddress();
  setAddress(address);

  // const balances = await client.getBalances([address]);
  // console.log(balances);
  setBalance("0x0");
}

const clientMethods = {
  Alchemy: alchemyGetAddressAndBalance,
  Biconomy: biconomyGetAddressAndBalance,
};

// Define a standard interface for client operations
function getAddressAndBalance(client, setBalance, setAddress) {
  const ClientMethod = clientMethods[client.provider];
  if (ClientMethod) {
    ClientMethod(client, setBalance, setAddress);
  } else {
    console.error("No client method available for provider:", client.provider);
  }
}

function useAddressAndBalance(client, user) {
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (client && user) {
      getAddressAndBalance(client, setBalance, setAddress);
    }
  }, [user, client, setBalance, setAddress]); // Added 'provider' to dependencies

  return { address, balance };
}

export default useAddressAndBalance;
