import useAlchemyClient from "../alchemy/alchemy.ts";
import useBiconomyClient from "../biconomy/biconomy.ts";

const clientHooks = {
  Alchemy: useAlchemyClient,
  Biconomy: useBiconomyClient,
};

const useSetAAClient = (provider, chain) => {
  const ClientHook = clientHooks[provider];
  return ClientHook ? ClientHook(chain) : null;
};

export default useSetAAClient;
