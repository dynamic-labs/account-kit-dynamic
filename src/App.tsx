import React from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { useState } from "react";

import { type SmartAccountClient } from "@alchemy/aa-core";

import { ChakraProvider } from "@chakra-ui/react";

import Header from "./Header.tsx";
import Home from "./Home.tsx";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  const [client, setClient] = useState<any>(null);
  const providers: string[] = ["Alchemy", "Biconomy"];
  const [currentProvider, setCurrentProvider] = useState<string>(providers[0]);

  return (
    <ChakraProvider>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID || "",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <Header
                client={client}
                currentProvider={currentProvider}
                setCurrentProvider={setCurrentProvider}
              />
              <Home
                currentProvider={currentProvider}
                currentClient={client}
                setClient={setClient}
              />
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </ChakraProvider>
  );
}
