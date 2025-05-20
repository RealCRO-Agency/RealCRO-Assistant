import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const body = req.body;

    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: body.messages
    });

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ error: 'Error generating chat response' });
  }
}
