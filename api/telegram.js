import { askGPT } from '../utils/gptAgent';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body;

    const chatId = body.message?.chat.id;
    const text = body.message?.text;

    if (chatId && text) {
      const reply = await askGPT(text);

      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: reply,
        }),
      });
    }

    res.status(200).send('ok');
  } else {
    res.status(405).send('Method not allowed');
  }
}