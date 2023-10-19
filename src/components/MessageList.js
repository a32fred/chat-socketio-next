import React, { useEffect } from "react";


const MessageList = ({ messages, user, handleReplyTo, messagesRef }) => {
    
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);
  
    return (
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
                            {message.audioUrl ? (
                                <audio controls>
                                    <source src={message.audioUrl} type="audio/wav" />
                                    Seu navegador não suporta o elemento de áudio.
                                </audio>
                            ) : (
                                <p className="text-sm break-words">{message.message}</p>
                            )}
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
    );
};

export default MessageList;
