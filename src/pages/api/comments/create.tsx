import type { NextApiRequest, NextApiResponse } from 'next';
import Comment from '../../../models/Comment';
import { connectToDatabase } from '../../../lib/mongoose';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { text,commentor,spot } = req.body;

  try {
    const newComment = new Comment({ text,commentor,spot });
    await newComment.save();
    return res.status(201).json(newComment);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler;
