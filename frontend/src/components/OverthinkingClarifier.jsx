import { useState } from "react";
import { generateAI } from "../api";

export default function OverthinkingClarifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleClarify = async () => {
    const data = await generateAI("clarifier", input);
    setOutput(data.result);
  };

  return (
    <div className="tool-content">
      <textarea
        placeholder="Describe the situation that's stressing you out..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="tool-actions">
        <button onClick={handleClarify} disabled={!input}>
          {input ? "🧩 Find Clarity" : "Describe situation..."}
        </button>
      </div>

      {output && (
        <div className="result-container fade-in">
          <h3>Analysis:</h3>
          <pre>{output}</pre>
          <div className="result-actions">
            <button className="btn-icon">📋 Copy</button>
            <button className="btn-icon">❤️ Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
