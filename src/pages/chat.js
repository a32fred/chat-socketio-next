import { AuthContext } from "@/context/authContext";
import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

// Endereço do servidor Socket.IO
const socket = io("https://auth-socketio.frederico-carlo.repl.co", { transports: ['websocket'] });

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { user } = useContext(AuthContext)



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
    socket.emit("chat message", { message: input, sender: user });
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-scroll bg-gray-950 text-white">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 ${message.sender === user ? "self-end" : "self-start"}`}>
            <div className={`flex items-end ${message.sender === user ? "flex-row-reverse" : ""}`}>
              <div className={`bg-gray-800 rounded-lg p-2 max-w-xs ${message.sender === user ? "bg-green-500 text-white" : "text-white"}`}>
                <p className="text-sm break-words">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex p-2 bg-slate-600 ">
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value) }}
          placeholder="Digite uma mensagem"
          className="flex-1 bg-gray-800 rounded-lg p-2 text-white"
        />

        <button type="submit" className="ml-2 bg-indigo-500 rounded-lg p-2 text-white">
          Enviar
        </button>
      </form>
    </div>
  )

}


