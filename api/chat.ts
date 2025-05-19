export const config = {
  runtime: "edge"
};

export default async function handler(req: Request) {
  const body = await req.json();
  const messages = body.messages;

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response("Missing OpenAI API Key", { status: 500 });
  }

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages,
      temperature: 0.7
    })
  });

  const data = await openaiRes.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
