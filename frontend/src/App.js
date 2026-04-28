// src/App.js
import React from "react";
import ChatUI from "./components/ChatUI";
import UploadPanel from "./components/UploadPanel";
import "./styles/chat.css";

function App() {
  return (
    <div className="app-container">
      
      {/* Sidebar */}
      <UploadPanel />

      {/* Chat Area */}
      <ChatUI />

    </div>
  );
}

export default App;