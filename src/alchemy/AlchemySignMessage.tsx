import React from "react";

const SignMessage: React.FC<any> = ({ alchemyClient }) => {
  return (
    <div>
      <h2>Send your message</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Message:
          <input type="text" id="message" />
        </label>
        <button
          onClick={() => {
            const message = document.getElementById("message");
            if (message) {
              alchemyClient.signMessage({ message: message.value });
            }
          }}
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SignMessage;
