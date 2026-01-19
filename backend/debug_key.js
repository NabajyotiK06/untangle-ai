import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

// Print key for debugging (masked)
const key = process.env.GEMINI_API_KEY;
console.log(`Key loaded: ${key ? key.substring(0, 10) + "..." : "UNDEFINED"}`);

const genAI = new GoogleGenerativeAI(key);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("✅ Generation works!");
        console.log(result.response.text());
    } catch (err) {
        console.error("❌ Generation Failed:", err.message);
        if (err.message.includes("API key not valid")) {
            console.error("Diagnostic: The key exists but Google rejected it. It might be expired, disabled, or for the wrong API.");
        }
    }
}

listModels();
