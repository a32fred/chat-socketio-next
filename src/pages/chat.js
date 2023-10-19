import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import MessageInput from "@/components/MessageInput";
import MessageList from "@/components/MessageList";
import ReplyToMessage from "@/components/ReplyToMessage";

const Chat = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const messagesRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUsername = localStorage.getItem("username");
      const savedToken = localStorage.getItem("token");
      if (!savedUsername || !savedToken) {
        router.push("/");
        return;
      }
      setUser(savedUsername);
      const newSocket = io("https://socketio.a32fred.repl.co", {
        transports: ["websocket"],
        query: { token: savedToken, userId: savedUsername },
      });
      setSocket(newSocket);

      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // Permissão concedida, agora você pode enviar notificações.
          }
        });
      }

      fetch("https://socketio.a32fred.repl.co/loadMessages")
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error("Erro ao carregar mensagens:", error));

      newSocket.on("chat message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);

        if (Notification.permission === "granted" && user !== msg.sender) {
          const notification = new Notification(`${msg.sender} enviou uma mensagem`, {
            body: msg.message,
            icon: "https://www.shareicon.net/data/2015/09/18/102854_archlinux_512x512.png",
          });
        }
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [router, user]);

  const handleReplyTo = (message) => {
    if (replyTo && replyTo.id === message.id) {
      setReplyTo(null);
    } else {
      setReplyTo({ id: message.id, sender: message.sender, message: message.message });
    }
  };

  const handleSubmit = (message) => {
    if (!message.trim()) return;
    socket.emit("chat message", { message, sender: user, replyTo: replyTo });
    setReplyTo(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} user={user} handleReplyTo={handleReplyTo} messagesRef={messagesRef} />
      <MessageInput onSubmit={handleSubmit} />
      {replyTo && <ReplyToMessage replyTo={replyTo} />}
    </div>
  );
};

export default Chat;

