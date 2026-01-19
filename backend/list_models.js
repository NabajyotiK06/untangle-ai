import "dotenv/config";

const KEY = process.env.GEMINI_API_KEY;

async function checkModels() {
    console.log("Checking models via REST...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("✅ Models found:");
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.error("❌ No models found or error:", data);
        }
    } catch (e) {
        console.error("Fetch error:", e);
    }
}

checkModels();
