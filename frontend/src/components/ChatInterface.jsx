import React, { useState } from "react";
import { generateAI } from "../api";

export default function ChatInterface() {
    const [activeMode, setActiveMode] = useState("message"); // 'message' | 'clarifier'
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!input) return;
        setLoading(true);
        setError(""); // Clear previous errors
        setOutput(""); // Clear previous output
        try {
            const data = await generateAI(activeMode, input);
            if (data.error) {
                setError("⚠️ " + (data.error.includes("429") ? "Traffic is high (Rate Limit). Please wait a moment." : "Something went wrong."));
            } else {
                setOutput(data.result);
            }
        } catch (e) {
            console.error(e);
            setError("Failed to connect to the server.");
        }
        setLoading(false);
    };

    const setStarter = (text) => {
        setInput(text);
    };

    return (
        <main className="chat-interface">
            <div className="hero-section">
                <span className="tagline-pill">✨ AI-powered emotional clarity</span>
                <h1>Turn messy thoughts into <br /><em>clear meaning</em></h1>
                <p>When your mind is tangled and words won't come, let AI help you find clarity. Express what you truly mean—with intention and grace.</p>
            </div>

            <div className="path-selector">
                <div
                    className={`path-card ${activeMode === 'message' ? 'active' : ''}`}
                    onClick={() => { setActiveMode('message'); setOutput(""); }}
                >
                    <div className="path-icon">💬</div>
                    <div className="path-info">
                        <h3>Message Builder</h3>
                        <p>Craft emotionally mature messages</p>
                    </div>
                </div>
                <div
                    className={`path-card ${activeMode === 'clarifier' ? 'active' : ''}`}
                    onClick={() => { setActiveMode('clarifier'); setOutput(""); }}
                >
                    <div className="path-icon">🧠</div>
                    <div className="path-info">
                        <h3>Overthinking Clarifier</h3>
                        <p>Untangle spiraling thoughts</p>
                    </div>
                </div>
                <div
                    className={`path-card ${activeMode === 'philosophy' ? 'active' : ''}`}
                    onClick={() => { setActiveMode('philosophy'); setOutput(""); }}
                >
                    <div className="path-icon">🪐</div>
                    <div className="path-info">
                        <h3>Philosophical Reflection</h3>
                        <p>Timeless wisdom for modern problems</p>
                    </div>
                </div>
            </div>

            <div className="active-tool-container">
                <div className="tool-header">
                    {activeMode === 'message' && (
                        <>
                            <h2>✨ Message Builder</h2>
                            <p>Describe what you're trying to say, and we'll help you craft an emotionally mature message.</p>
                        </>
                    )}
                    {activeMode === 'clarifier' && (
                        <>
                            <h2>🧠 Overthinking Clarifier</h2>
                            <p>Pour out your tangled thoughts. We'll break them down into what you can relieve.</p>
                        </>
                    )}
                    {activeMode === 'philosophy' && (
                        <>
                            <h2>🪐 Philosophical Reflection</h2>
                            <p>Gain a higher perspective. See your situation through the lens of timeless wisdom.</p>
                        </>
                    )}
                </div>

                <div className="quick-starters">
                    <span className="input-label" style={{ marginBottom: 0, marginRight: '1rem', alignSelf: 'center' }}>Quick starters:</span>
                    {activeMode === 'message' && (
                        <>
                            <button className="starter-chip" onClick={() => setStarter("Text her without sounding desperate")}>Text without sounding desperate</button>
                            <button className="starter-chip" onClick={() => setStarter("Apologize maturely")}>Apologize maturely</button>
                            <button className="starter-chip" onClick={() => setStarter("Confess feelings gently")}>Confess feelings gently</button>
                            <button className="starter-chip" onClick={() => setStarter("Set a boundary kindly")}>Set a boundary</button>
                        </>
                    )}
                    {activeMode === 'clarifier' && (
                        <>
                            <button className="starter-chip" onClick={() => setStarter("I feel like everyone is ignoring me")}>Ignoring me</button>
                            <button className="starter-chip" onClick={() => setStarter("I'm anxious about my future career")}>Career anxiety</button>
                            <button className="starter-chip" onClick={() => setStarter("He hasn't texted back in 3 hours")}>No text back</button>
                        </>
                    )}
                    {activeMode === 'philosophy' && (
                        <>
                            <button className="starter-chip" onClick={() => setStarter("Why does this rejection hurt so much?")}>Why does it hurt?</button>
                            <button className="starter-chip" onClick={() => setStarter("I feel overwhelmed by everything")}>I feel overwhelmed</button>
                            <button className="starter-chip" onClick={() => setStarter("What is the point of my struggle?")}>Meaning of struggle</button>
                        </>
                    )}
                </div>

                <label className="input-label">Describe your situation</label>
                <textarea
                    placeholder={
                        activeMode === 'message' ? "What are you trying to say? Who is it for? What's the context?" :
                            activeMode === 'clarifier' ? "What's on your mind? Don't worry about grammar, just vent." :
                                "What deeper question is troubling you? (e.g., 'I fear I am wasting my life')"
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button className="generate-btn" onClick={handleGenerate} disabled={loading || !input}>
                    {loading ? "Untangling..." : (
                        activeMode === 'message' ? "Generate Message" :
                            activeMode === 'clarifier' ? "Start Finding Clarity" :
                                "Seek Wisdom"
                    )}
                </button>

                {error && (
                    <div className="result-display" style={{ borderColor: '#ef4444', background: '#fef2f2' }}>
                        <div className="result-content" style={{ color: '#b91c1c', fontWeight: 500 }}>
                            {error}
                        </div>
                    </div>
                )}

                {output && (
                    <div className="result-display">
                        <div className="result-content">
                            {output}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
