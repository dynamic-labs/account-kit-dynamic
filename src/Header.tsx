import React, { useContext } from "react";
import { useDynamicContext, DynamicNav } from "@dynamic-labs/sdk-react-core";
import { HStack, Box } from "@chakra-ui/react";

import ClientContext from "./context/ClientContext.ts";

import ChooseAAProvider from "./ChooseAAProvider.tsx";

import useAddressAndBalance from "./hooks/useAddressAndBalance.ts";

export default function Header() {
  const { client } = useContext(ClientContext);
  const { user } = useDynamicContext();

  const { address, balance } = useAddressAndBalance(client, user);

  return (
    <Box paddingY={4}>
      {user && (
        <HStack className="nav_element" justify="space-evenly">
          <DynamicNav />
          <HStack className="nav_element_inner">
            {address && (
              <p className="smart-account-client-address">Address: {address}</p>
            )}
            {balance && (
              <p className="smart-account-client-balance">Balance: {balance}</p>
            )}
          </HStack>
          <ChooseAAProvider />
        </HStack>
      )}
    </Box>
  );
}
