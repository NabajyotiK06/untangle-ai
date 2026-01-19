import { useState } from "react";
import { generateAI } from "../api";

export default function MessageBuilder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
    const data = await generateAI("message", input);
    setOutput(data.result);
  };

  return (
    <div className="tool-content">
      <textarea
        placeholder="What's on your mind? (e.g., 'I want to tell him I need space without being rude')"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="tool-actions">
        <button onClick={handleGenerate} disabled={!input}>
          {input ? "✨ Untangle This" : "Enter a thought..."}
        </button>
      </div>

      {output && (
        <div className="result-container fade-in">
          <h3>Clear Expression:</h3>
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
