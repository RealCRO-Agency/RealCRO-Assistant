export const config = {
  runtime: "edge"
};

export default async function handler(req: Request) {
  const { messages } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY || '';

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not set." }), { status: 500 });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      stream: false
    })
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
