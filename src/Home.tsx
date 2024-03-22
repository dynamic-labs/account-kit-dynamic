import React from "react";
import useAlchemyClient from "./alchemy.ts";

import { type SmartAccountClient } from "@alchemy/aa-core";
import Transaction from "./Transaction.tsx";

const Home = (): JSX.Element => {
  const alchemyClient: SmartAccountClient | null = useAlchemyClient();

  return (
    <div>
      {alchemyClient && (
        <div>
          <p>
            Alchemy Client: {JSON.stringify(alchemyClient.account?.address)}
          </p>
          <Transaction alchemyClient={alchemyClient} />
        </div>
      )}
    </div>
  );
};

export default Home;
