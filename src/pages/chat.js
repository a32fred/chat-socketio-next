import Router from "next/router";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "../pages/api/axios_api";

// Endereço do servidor Socket.IO
const socket = io("https://auth-socketio.frederico-carlo.repl.co", { transports: ['websocket'] });

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");

  
  
  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem('token');
      const res = await fetch('https://auth-socketio.frederico-carlo.repl.co/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!token) {
        setIsTokenValid(false)
      }
    

      if (res.ok) {
        const data = await res.json();
        setUserName(data.username);
        setIsTokenValid(true)
      } else {
        console.error('Erro ao verificar token');
      }
    }

    verifyToken();
  }, []);


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

  if (isTokenValid) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-scroll bg-gray-950 text-white">
          {messages.map((message, index) => (
            <div key={index} className="p-2">
              <div className="flex items-end">
                <div className="bg-gray-800 rounded-lg p-2 max-w-xs">
                  <p className="text-sm break-words">{`${userName}: ${message}`}</p>
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

  } else {
    Router.push('/')
  }

}
