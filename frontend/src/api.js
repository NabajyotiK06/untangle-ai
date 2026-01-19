export const generateAI = async (type, input) => {
  const res = await fetch("http://localhost:5000/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, input })
  });

  return res.json();
};
