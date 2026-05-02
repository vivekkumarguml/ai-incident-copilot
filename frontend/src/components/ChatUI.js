// src/components/ChatUI.js

import React, { useState, useEffect, useRef } from "react";
import { askQuestion } from "../api";

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 For auto scroll
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Handle sending message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const res = await askQuestion(input);

      const botMessage = {
        text: res.response || res.error || "Something went wrong",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error("Chat error:", err);

      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to backend ❌", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  return (
    <div className="chat-container">

      {/* Messages */}
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <div className="bubble">
              {msg.text.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Typing animation */}
        {loading && (
          <div className="message bot">
            <div className="bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {/* Auto-scroll target */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about incident..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>

    </div>
  );
}

export default ChatUI;