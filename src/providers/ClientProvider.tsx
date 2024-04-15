import React, { useState, createContext, useContext } from "react";

import useAlchemyClient from "../utils/alchemy/createAlchemyClient.ts";
import useBiconomyClient from "../utils/biconomy/createBiconomyClient.ts";

import { sepolia } from "@alchemy/aa-core";

interface IClientContext {
  client: any; // Consider defining a more specific type than 'any' if possible.
  setProvider: (provider: string) => void;
}

const ClientContext = createContext<IClientContext>({
  client: null,
  setProvider: () => {},
});

function useClientBasedOnProvider(provider: string) {
  const alchemyClient = useAlchemyClient(sepolia);
  const biconomyClient = useBiconomyClient(sepolia);

  const clients = {
    Alchemy: alchemyClient,
    Biconomy: biconomyClient,
  };

  return clients[provider];
}

export const ClientProvider = ({ children }) => {
  const [provider, setProvider] = useState("Alchemy");

  const client = useClientBasedOnProvider(provider);

  const contextValue = {
    client,
    setProvider,
  };

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
