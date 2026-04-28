// src/components/ChatUI.js
import React, { useState } from "react";
import { API } from "../api";

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await API.post("/query/", null, {
        params: { q: input }
      });

      const botMsg = {
        text: res.data.answer || res.data.error,
        sender: "bot"
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: "Error connecting to backend", sender: "bot" }
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      
      {/* Messages */}
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about incident..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}

export default ChatUI;