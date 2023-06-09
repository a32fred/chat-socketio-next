import { useRef, useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import { parseCookies } from "nookies";
import io from "socket.io-client";

const socket = io("https://auth-socketio.frederico-carlo.repl.co", { transports: ["websocket"] });

export default function Chat() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("chat message", { message: input, sender: user, replyTo: replyTo });
    setInput("");
    setReplyTo(null);
    inputRef.current.focus();
  };

  const handleReplyTo = (message) => {
    if (replyTo && replyTo.id === message.id) {
      setReplyTo(null);
      inputRef.current.focus();
    } else {
      setReplyTo({ id: message.id, sender: message.sender, message: message.message });
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages([...messages, msg]);
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    });
    return () => {
      socket.off("chat message");
    };
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-scroll bg-gray-950 text-white" ref={messagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`p-2 ${message.sender === user ? "self-end" : "self-start"}`}>
            <div className={`flex items-end ${message.sender === user ? "flex-row-reverse" : ""}`}>
              <div className={`bg-gray-800 rounded-lg p-2 max-w-xs ${message.sender === user ? "bg-green-600 text-white" : "text-white"}`}>
                {message.replyTo && (
                  <div className="mb-1 text-sm">
                    <div className={` ${message.sender === user ? "bg-green-700" : "bg-gray-900"} rounded-lg p-2`}>
                      <p className="font-bold mb-1">{message.replyTo.sender} disse:</p>
                      <p className="break-words">{message.replyTo.message}</p>
                    </div>
                  </div>
                )}
                <p className="text-sm break-words">{message.message}</p>
              </div>
            </div>
            <div className={`flex ${message.sender === user ? "justify-end" : "justify-start"} text-xs text-gray-500`}>
              <p className="cursor-pointer hover:underline" onClick={() => handleReplyTo(message)}>
                Responder
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex flex-col items-center bg-gray-950 p-2">
          <div className="flex w-full">
        <input
          ref={inputRef}
          className="flex-1 bg-slate-800 px-2 py-1 rounded-lg mr-2"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={!input.trim()}
        >
          Send
        </button>
          </div>
        </form>
        {replyTo && (
          <div className="absolute bottom-14 left-0 right-0 mt-2 z-50 bg-gray-900 bg-opacity-70 p-2 rounded-t-lg">
            <p className="text-xs text-gray-600">
              Respondendo a {replyTo.sender}:
            </p>
            <p className="text-sm">{replyTo.message}</p>
            <button
              className="text-xs text-red-500 hover:text-red-600"
              onClick={() => setReplyTo(null)}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { token } = parseCookies(context)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
