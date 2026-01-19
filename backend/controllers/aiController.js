import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateResponse = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const { type, input } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY missing");
    }

    // ✅ THIS MODEL WORKS WITH LATEST SDK
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    let prompt = "";

    if (type === "message") {
      prompt = `
You are Untangle — a calm, emotionally intelligent relationship expert.

Rewrite the following thought into a mature, confident, emotionally clear message.
Do not sound needy, weak, or dramatic.

Thought:
"${input}"
`;
    } else if (type === "clarifier") {
      prompt = `
You are Untangle — an emotional clarity assistant.

Break the situation below into:
1. What you control
2. What you don’t control
3. What actually matters
4. What to do next

Situation:
"${input}"
`;
    } else if (type === "philosophy") {
      prompt = `
You are a wise Stoic philosopher and mentor (channeling Marcus Aurelius and Seneca).

Analyze the user's situation through the lens of impermanence, virtue, and the dichotomy of control.
Provide a calm, profound perspective that helps them detach from immediate anxiety and see the bigger picture.
Do not be dismissive, but offer a higher vantage point.

Situation:
"${input}"
`;
    } else {
      throw new Error("Invalid request type");
    }

    // RETRY LOGIC FOR 429 ERRORS
    let attempts = 0;
    while (attempts < 3) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        res.json({ result: text });
        return; // Success, exit function
      } catch (err) {
        if (err.message.includes("429") && attempts < 2) {
          const waitTime = (attempts + 1) * 10000; // Wait 10s, then 20s
          console.log(`⏳ Hit Rate Limit (429). Retrying in ${waitTime / 1000}s... (Attempt ${attempts + 1}/3)`);
          await new Promise(r => setTimeout(r, waitTime));
          attempts++;
        } else {
          throw err; // Re-throw other errors or if max attempts reached
        }
      }
    }

  } catch (err) {
    console.error("🔥 Gemini Error:", err);
    res.status(500).json({ error: err.message });
  }
};
