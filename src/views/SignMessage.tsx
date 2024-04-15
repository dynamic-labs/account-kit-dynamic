import React from "react";
import signMessage from "../utils/signMessage.ts";

import { useClient } from "../providers/ClientProvider.tsx";

import { Input, Button, HStack, Box, VStack } from "@chakra-ui/react";

const SignMessage: React.FC<any> = () => {
  const { client } = useClient();

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
                  try {
                    signMessage(client, message.value);
                  } catch (e) {
                    console.error(e);
                  }
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
