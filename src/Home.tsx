import React, { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";

import {
  useDynamicContext,
  DynamicConnectButton,
} from "@dynamic-labs/sdk-react-core";

import MainViews from "./MainViews.tsx";

import useSetAAClient from "./hooks/useSetAAClient.ts";

import { sepolia } from "@alchemy/aa-core";

const Home = ({ currentProvider, currentClient, setClient }): JSX.Element => {
  const localClient = useSetAAClient(currentProvider, sepolia);

  useEffect(() => {
    if (localClient && !currentClient) {
      setClient(localClient);
    } else if (
      localClient &&
      currentClient &&
      localClient.provider !== currentClient.provider
    ) {
      setClient(localClient);
    }
  }, [localClient, currentClient]);

  const { user } = useDynamicContext();

  const [viewOpen, setViewOpen] = useState<boolean>(false);

  // const [shouldExtendWithSessionKeys, setShouldExtendWithSessionKeys] =
  //   useState<boolean>(false);

  const accessButton = <div>Sign up/Log in</div>;

  return (
    <Box className="main-container">
      {!user && <DynamicConnectButton>{accessButton}</DynamicConnectButton>}
      {currentClient && (
        <Box className="views-container">
          <MainViews
            provider={currentProvider}
            client={currentClient}
            chain={sepolia}
            setViewOpen={setViewOpen}
            viewOpen={viewOpen}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
