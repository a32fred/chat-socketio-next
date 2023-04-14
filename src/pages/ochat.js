import { useState, useEffect } from "react";
import io from "socket.io-client";


 export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      const socket = io("http://localhost:80");
  
      socket.on('message', (message) => {
        setMessages([...messages, message]);
      });
  
      return () => {
        socket.disconnect();
      };
    }, [messages]);
  
    const sendMessage = (event) => {
      event.preventDefault();
      const socket = io();
      socket.emit('message', message);
      setMessage('');
    };
  
    return (
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
  