
import React from "react";

const ReplyToMessage = ({ replyTo }) => {
  return (
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
  );
};

export default ReplyToMessage;
