import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import "./index.css";

// Layout component to wrap Sidebar + Content
function AppLayout({ children, chats, activeChatId, setActiveChatId, createNewChat, deleteChat, isSidebarOpen, setIsSidebarOpen, user }) {
  return (
    <div className="app-layout">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={() => setActiveChatId(null)}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onDeleteChat={deleteChat}
        user={user}
      />

      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  // User State (Mock)
  const [user, setUser] = useState(null); // null or { name, plan, email }

  useEffect(() => {
    // Check local storage for mock session
    const savedUser = localStorage.getItem("untangle_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("untangle_user", JSON.stringify(userData));
  };

  // Chat History State
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("untangle_chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChatId, setActiveChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem("untangle_chats", JSON.stringify(chats));
  }, [chats]);

  const handleChatUpdate = (newData) => {
    if (!activeChatId) {
      const newId = Date.now().toString();
      const title = newData.input ? newData.input.slice(0, 30) + (newData.input.length > 30 ? "..." : "") : "New Process";

      const newChat = {
        id: newId,
        title: title,
        timestamp: Date.now(),
        data: newData
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newId);
    } else {
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          let title = chat.title;
          if ((!title || title === "New Process") && newData.input) {
            title = newData.input.slice(0, 30) + (newData.input.length > 30 ? "..." : "");
          }

          return {
            ...chat,
            data: { ...chat.data, ...newData },
            title: title
          };
        }
        return chat;
      }));
    }
  };

  const deleteChat = (id) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/" element={
          <AppLayout
            chats={chats}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            createNewChat={() => setActiveChatId(null)}
            deleteChat={deleteChat}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            user={user}
          >
            <ChatInterface
              initialData={activeChat ? activeChat.data : null}
              onUpdate={handleChatUpdate}
            />
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
}
