export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }
  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(req.body),
  });
  const data = await openaiRes.json();
  return res.status(openaiRes.status).json(data);
}
