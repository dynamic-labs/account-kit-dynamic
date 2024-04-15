import React, { useState } from "react";

import { Box } from "@chakra-ui/react";

import {
  useDynamicContext,
  DynamicConnectButton,
} from "@dynamic-labs/sdk-react-core";

import MainViews from "../MainViews.tsx";

import { sepolia } from "@alchemy/aa-core";

import { useClient } from "../providers/ClientProvider.tsx";

const Home = (): JSX.Element => {
  const { client } = useClient();

  const { user } = useDynamicContext();

  const [currentViewOpen, setCurrentViewOpen] = useState<boolean>(false);

  const accessButton = <div>Sign up/Log in</div>;

  return (
    <Box className="main-container">
      {!user && <DynamicConnectButton>{accessButton}</DynamicConnectButton>}
      {client && (
        <Box className="views-container">
          <MainViews
            chain={sepolia}
            setCurrentViewOpen={setCurrentViewOpen}
            currentViewOpen={currentViewOpen}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
