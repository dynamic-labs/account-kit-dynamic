import { useState, useEffect } from "react";

// Adapter for Alchemy
function alchemyGetAddressAndBalance(client, setBalance, setAddress) {
  const address = client.account.address;
  client
    .getBalance({ address })
    .then((balance) => {
      setBalance(balance);
    })
    .catch((error) => console.error("Failed to fetch balance:", error));
  setAddress(address);
}

// Adapter for Biconomy (assuming a different method structure)
function biconomyGetAddressAndBalance(client, setBalance, setAddress) {
  // Assuming you want to reset to a default state or this is just for the example
  setAddress("Default Biconomy Address"); // Use a default or fetched address
  setBalance("0x0"); // Use a default or fetched balance
}

const clientMethods = {
  Alchemy: alchemyGetAddressAndBalance,
  Biconomy: biconomyGetAddressAndBalance,
};

// Define a standard interface for client operations
function getAddressAndBalance(provider, client, setBalance, setAddress) {
  const ClientMethod = clientMethods[provider];
  if (ClientMethod) {
    ClientMethod(client, setBalance, setAddress);
  } else {
    console.error("No client method available for provider:", provider);
  }
}

function useAddressAndBalance(provider, client, user) {
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (client && user) {
      getAddressAndBalance(provider, client, setBalance, setAddress);
    }
  }, [provider, user, client, setBalance, setAddress]); // Added 'provider' to dependencies

  return { address, balance };
}

export default useAddressAndBalance;
