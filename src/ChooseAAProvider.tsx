import React, { useContext } from "react";
import { HStack, Button } from "@chakra-ui/react";
import ClientContext from "./context/ClientContext.ts";

const ChooseAAProviderComponent = () => {
  const { client, setProvider } = useContext(ClientContext);
  const providers = ["Alchemy", "Biconomy"];

  return (
    <div>
      <HStack>
        {providers.map((prov) => (
          <Button
            key={prov}
            onClick={() => setProvider(prov)}
            colorScheme={client?.provider === prov ? "blue" : "gray"}
          >
            {prov}
          </Button>
        ))}
      </HStack>
      {client && <div>Current Client: {client.provider}</div>}
    </div>
  );
};

export default ChooseAAProviderComponent;
