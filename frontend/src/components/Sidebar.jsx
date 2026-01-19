import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({
    chats = [],
    activeChatId,
    onSelectChat,
    onNewChat,
    isOpen,
    toggleSidebar,
    onDeleteChat,
    user
}) {
    return (
        <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
            <div className="sidebar-header">
                {isOpen && (
                    <div className="logo">
                        <span className="icon">🪢</span> Untangle
                    </div>
                )}
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    {isOpen ? "❚❚" : "▶"}
                </button>
            </div>

            <button className="new-chat-btn" onClick={onNewChat}>
                <span className="plus">+</span> {isOpen && "New Process"}
            </button>

            <nav className="sidebar-nav">
                <div className="nav-group recent-history">
                    {isOpen && <span className="group-title">History</span>}

                    <div className="history-list">
                        {chats.length === 0 && isOpen && (
                            <div className="empty-history">No history yet</div>
                        )}

                        {chats.map(chat => (
                            <div key={chat.id} className="history-item-wrapper">
                                <a
                                    href="#"
                                    className={`history-item ${chat.id === activeChatId ? "active" : ""}`}
                                    onClick={(e) => { e.preventDefault(); onSelectChat(chat.id); }}
                                    title={chat.title || "New Chat"}
                                >
                                    <span className="icon">💬</span>
                                    {isOpen && (
                                        <span className="text-truncate">
                                            {chat.title || "New Message..."}
                                        </span>
                                    )}
                                </a>
                                {isOpen && onDeleteChat && (
                                    <button
                                        className="delete-chat-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteChat(chat.id);
                                        }}
                                        title="Delete chat"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Profile section */}
            <div className="user-profile">
                {user ? (
                    <>
                        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                        {isOpen && (
                            <div className="user-info">
                                <span className="name">{user.name}</span>
                                <span className="plan-badge">
                                    {user.plan}
                                    {user.plan === "Free Plan" && (
                                        <Link to="/pricing" className="upgrade-link">Upgrade</Link>
                                    )}
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="avatar">?</div>
                        {isOpen && (
                            <div className="user-info">
                                <span className="name">Guest</span>
                                <Link to="/login" className="login-link">Log in</Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </aside>
    );
}
