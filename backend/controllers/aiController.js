export const generateResponse = async (req, res) => {
  const { type, input } = req.body;

  let response = "";

  if (type === "message") {
    response = `
Here is a calm, emotionally mature message:

"${input}"

Expressed with honesty, clarity, and no pressure.
    `;
  }

  if (type === "clarifier") {
    response = `
🔹 What you control:
Your actions, words, and boundaries.

🔹 What you don’t control:
Other people’s reactions.

🔹 What actually matters:
Clarity, respect, and self-worth.

🔹 What to do next:
Respond calmly and avoid overthinking.
    `;
  }

  res.json({ result: response });
};
