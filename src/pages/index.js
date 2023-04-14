import { useState, useEffect } from "react";
import io from "socket.io-client";

// Endereço do servidor Socket.IO
const socket = io("https://c2d8-2804-620c-8f0-5500-7dcc-ce9-ded7-c605.ngrok-free.app", {transports:['websocket']});

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [messages]);



  const handleSubmit = (event) => {
    event.preventDefault();
    
    socket.emit("chat message", input);
    setInput("");

  };

  return (
    <div className="bg-body flex flex-col h-screen">
      <ul className="bg-gray-800 space-y-4 rounded-lg p-4 overflow-y-scroll flex-1">
        {messages.map((msg, index) => (
          <li className="text-slate-200" a key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-slate-500"
          placeholder="digite aq a msg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="padding: 10px text-center" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
