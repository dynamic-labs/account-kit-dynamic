import React from "react";

import { HStack, Button } from "@chakra-ui/react";
export default function ChooseAAProvider({
  currentProvider,
  setCurrentProvider,
}): JSX.Element {
  return (
    <div>
      <h1>Choose AA Provider</h1>

      <HStack>
        <Button
          onClick={() => {
            setCurrentProvider("Alchemy");
          }}
          colorScheme={currentProvider === "Alchemy" ? "blue" : undefined}
        >
          Alchemy
        </Button>
        <Button
          onClick={() => {
            setCurrentProvider("Biconomy");
          }}
          colorScheme={currentProvider === "Biconomy" ? "blue" : undefined}
        >
          Biconomy
        </Button>
      </HStack>
    </div>
  );
}