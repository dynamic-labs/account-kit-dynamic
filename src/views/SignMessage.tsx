import React from "react";
import signMessage from "../utils/signMessage.ts";

import { Input, Button, HStack } from "@chakra-ui/react";

const SignMessage: React.FC<any> = ({ client }) => {
  return (
    <div>
      <h2>Send your message</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <HStack>
          <label>
            Message:
            <Input type="text" id="message" />
          </label>
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
    </div>
  );
};

export default SignMessage;
