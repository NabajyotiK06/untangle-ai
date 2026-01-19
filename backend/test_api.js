const BASE_URL = 'http://localhost:5000/api/ai/generate';

async function testMode(type, input) {
    console.log(`\n--- Testing Mode: ${type} ---`);
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, input }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Error ${response.status}: ${errorText}`);
            return;
        }

        const data = await response.json();
        console.log("✅ Success!");
        console.log("Input:", input);
        console.log("Output Preview:", data.result.substring(0, 150).replace(/\n/g, ' ') + "...");
    } catch (error) {
        console.error("❌ Connection Failed:", error.message);
    }
}

async function runTests() {
    console.log("Starting API Verification...");

    // Test 1: Message Builder
    await testMode('message', 'I want to break up with him nicely');

    // Test 2: Clarifier
    await testMode('clarifier', 'I am stressed about my job interview');

    // Test 3: Philosophy (New)
    await testMode('philosophy', 'Why do I feel so empty despite having everything?');
}

runTests();
