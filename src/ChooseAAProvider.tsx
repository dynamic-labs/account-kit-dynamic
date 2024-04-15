import React, { useContext } from "react";
import { HStack, Button } from "@chakra-ui/react";
import { useClient } from "./providers/ClientProvider.tsx";

const ChooseAAProviderComponent = () => {
  const { client, setProvider } = useClient();
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
    </div>
  );
};

export default ChooseAAProviderComponent;
