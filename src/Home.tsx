import React, { useEffect, useState } from "react";
import useAlchemyClient from "./alchemy/alchemy.ts";

import {
  useDynamicContext,
  DynamicConnectButton,
} from "@dynamic-labs/sdk-react-core";
import { type SmartAccountClient } from "@alchemy/aa-core";
import { sepolia } from "@alchemy/aa-core";

import MainViews from "./MainViews.tsx";

const Home = ({ globalAlchemyClient, setGlobalAlchemyClient }): JSX.Element => {
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [shouldExtendWithSessionKeys, setShouldExtendWithSessionKeys] =
    useState<boolean>(false);

  const { user } = useDynamicContext();

  const chain = sepolia;

  const alchemyClient: SmartAccountClient | null = useAlchemyClient(
    shouldExtendWithSessionKeys,
    chain
  );

  useEffect(() => {
    console.log(alchemyClient);
    if (alchemyClient && !globalAlchemyClient)
      setGlobalAlchemyClient(alchemyClient);
  }, [alchemyClient]);

  useEffect(() => {
    if (!viewOpen) {
      setShouldExtendWithSessionKeys(false);
    }
  }, [viewOpen]);

  const accessButton = <div>Sign up/Log in</div>;

  return (
    <div>
      {!user && <DynamicConnectButton>{accessButton}</DynamicConnectButton>}
      {alchemyClient && (
        <div>
          <MainViews
            alchemyClient={alchemyClient}
            chain={chain}
            setViewOpen={setViewOpen}
            viewOpen={viewOpen}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
