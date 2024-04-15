import React, { useContext } from "react";
import signMessage from "../utils/signMessage.ts";

import ClientContext from "../context/ClientContext.ts";

import { Input, Button, HStack, Box, VStack } from "@chakra-ui/react";

const SignMessage: React.FC<any> = () => {
  const { client } = useContext(ClientContext);

  return (
    <Box>
      <VStack>
        <h2>Send your message</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <HStack>
            <Input type="text" id="message" placeholder="Message here" />

            <Button
              onClick={() => {
                const message = document.getElementById("message");
                if (message) {
                  signMessage(client, message.value);
                }
              }}
              type="submit"
            >
              Send
            </Button>
          </HStack>
        </form>
      </VStack>
    </Box>
  );
};

export default SignMessage;
