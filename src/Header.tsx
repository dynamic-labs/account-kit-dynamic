import React, { useEffect } from "react";
import { useDynamicContext, DynamicNav } from "@dynamic-labs/sdk-react-core";
import { HStack } from "@chakra-ui/react";

import ChooseAAProvider from "./ChooseAAProvider.tsx";

export default function Header({
  globalAlchemyClient,
  currentProvider,
  setCurrentProvider,
}) {
  const { user } = useDynamicContext();

  const [balance, setBalance] = React.useState<number | null>(null);
  const [address, setAddress] = React.useState<string | null>(null);

  useEffect(() => {
    if (globalAlchemyClient && user && (!balance || !address)) {
      const address = globalAlchemyClient.account.address;

      globalAlchemyClient.getBalance({ address }).then((balance) => {
        setBalance(balance);
      });

      setAddress(address);
    }
  }, [balance, address, user, globalAlchemyClient]);

  return (
    <nav className="nav">
      {user && (
        <HStack className="nav_element">
          <DynamicNav />
          <HStack className="nav_element_inner">
            {address && (
              <p className="smart-account-client-address">Address: {address}</p>
            )}
            {balance && (
              <p className="smart-account-client-balance">Balance: {balance}</p>
            )}
          </HStack>
          <ChooseAAProvider
            currentProvider={currentProvider}
            setCurrentProvider={setCurrentProvider}
          />
        </HStack>
      )}
    </nav>
  );
}
