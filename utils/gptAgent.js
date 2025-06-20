import { readFileSync } from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const knowledgeBase = readFileSync('./knowledge/base.txt', 'utf-8');

export async function askGPT(message) {
  const prompt = `
Ты — эксперт по теме. Используй знания из базы:
${knowledgeBase}

Вопрос: ${message}
Ответ:
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.4,
  });

  return completion.choices[0].message.content.trim();
}