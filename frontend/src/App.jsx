import React from "react";
import ChatInterface from "./components/ChatInterface";
import "./index.css";

export default function App() {
  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="brand">
          ✨ Untangle
        </div>
        <div>
          <a href="#" className="nav-link">History</a>
        </div>
      </nav>
      <ChatInterface />
    </div>
  );
}
