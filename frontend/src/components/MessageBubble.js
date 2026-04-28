// components/MessageBubble.js
import React from "react";

function MessageBubble({ text, sender }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: sender === "user" ? "flex-end" : "flex-start",
      margin: "10px"
    }}>
      <div style={{
        background: sender === "user" ? "#007bff" : "#2d2d2d",
        color: "white",
        padding: "10px",
        borderRadius: "10px",
        maxWidth: "60%"
      }}>
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;