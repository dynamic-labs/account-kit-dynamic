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
  const [currentProvider, setCurrentProvider] = useState<
    "Alchemy" | "Biconomy" | ""
  >("");
  const [globalAlchemyClient, setGlobalAlchemyClient] =
    useState<SmartAccountClient | null>(null);

  const [globalBiconomyClient, setGlobalBiconomyClient] =
    useState<BiconomySmartAccountV2 | null>(null);

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
                globalAlchemyClient={globalAlchemyClient}
                currentProvider={currentProvider}
                setCurrentProvider={setCurrentProvider}
              />
              <Home
                globalAlchemyClient={globalAlchemyClient}
                setGlobalAlchemyClient={setGlobalAlchemyClient}
              />
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </ChakraProvider>
  );
}
