import { sepolia } from "@alchemy/aa-core";

import React, { useState, useMemo } from "react";
import ClientContext from "../context/ClientContext.ts";
import useChooseAAClient from "../hooks/useChooseAAClient.ts";

const ClientProvider: React.FC = ({ children }) => {
  const [provider, setProvider] = useState("Alchemy"); // Default provider
  const client = useChooseAAClient(provider, sepolia);

  // Context value now includes setProvider to allow consumers to change the provider
  const contextValue = useMemo(
    () => ({
      client,
      setProvider, // Allows consumer components to change the provider
    }),
    [client]
  );

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
