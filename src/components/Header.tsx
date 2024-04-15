import React from "react";
import { useDynamicContext, DynamicNav } from "@dynamic-labs/sdk-react-core";
import { HStack, Box } from "@chakra-ui/react";

import { useClient } from "../providers/ClientProvider.tsx";

import ChooseAAProvider from "./ChooseAAProvider.tsx";

import useAddressAndBalance from "../hooks/useAddressAndBalance.ts";

export default function Header() {
  const { client } = useClient();
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
              <p className="smart-account-client-balance">
                Balance: {balance.toString()}
              </p>
            )}
          </HStack>
          <ChooseAAProvider />
        </HStack>
      )}
    </Box>
  );
}
