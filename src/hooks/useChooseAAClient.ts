import useAlchemyClient from "../alchemy/createAlchemyClient.ts";
import useBiconomyClient from "../biconomy/createBiconomyClient.ts";

const clientHooks = {
  Alchemy: useAlchemyClient,
  Biconomy: useBiconomyClient,
};

const useChooseAAClient = (provider, chain) => {
  const ClientHook = clientHooks[provider];
  return ClientHook ? ClientHook(chain) : null;
};

export default useChooseAAClient;
