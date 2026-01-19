import React from "react";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <span className="icon">🪢</span> Untangle
                </div>
                <button className="sidebar-toggle">❚❚</button>
            </div>

            <button className="new-chat-btn">
                <span className="plus">+</span> New Process
            </button>

            <nav className="sidebar-nav">
                <div className="nav-group">
                    <a href="#" className="nav-item active">
                        <span className="icon">⚡</span> Dashboard
                    </a>
                    <a href="#" className="nav-item">
                        <span className="icon">↺</span> History
                    </a>
                </div>

                <div className="nav-group recent-history">
                    <span className="group-title">Today</span>
                    <a href="#" className="history-item">Text to ex-girlfriend...</a>
                    <a href="#" className="history-item">Anxiety about work...</a>
                </div>
            </nav>

            <div className="user-profile">
                <div className="avatar">NJ</div>
                <div className="user-info">
                    <span className="name">Nabajyoti</span>
                    <span className="email">Free Plan</span>
                </div>
            </div>
        </aside>
    );
}
