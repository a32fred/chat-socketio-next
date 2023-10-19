import React, { useState } from "react";

const MessageInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center bg-gray-950 p-2">
      <div className="flex w-full">
        <input
          className="flex-1 bg-slate-800 px-2 py-1 rounded-lg mr-2"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
          type="submit"
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
