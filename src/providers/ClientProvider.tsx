import React, { useState, useEffect, createContext, useContext } from "react";
import useChooseAAClient from "../hooks/useChooseAAClient.ts";

import { sepolia } from "@alchemy/aa-core";

const ClientContext = createContext({
  client: null,
  setProvider: () => {},
});

export const ClientProvider = ({ children }) => {
  const [provider, setProvider] = useState("Alchemy");
  const [client, setClient] = useState(null);

  // Using the hook to obtain the client based on the current provider
  const fetchedClient = useChooseAAClient(provider, sepolia);

  // Effect to update the client in state when fetchedClient changes
  useEffect(() => {
    setClient(fetchedClient);
  }, [fetchedClient]);

  // Providing the context value that will cause re-renders when client changes
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
