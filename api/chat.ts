export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request): Promise<Response> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response("Missing OPENAI_API_KEY", { status: 500 });
  }

  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or "gpt-4" if available
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await openaiRes.json();

    return new Response(
      JSON.stringify({ reply: data.choices?.[0]?.message?.content || "No response." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
