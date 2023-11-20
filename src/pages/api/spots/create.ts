import type { NextApiRequest, NextApiResponse } from 'next';
import Spot from '../../../models/Spot';
import { connectToDatabase } from '../../../lib/mongoose';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { title, text, author, exifData, location } = req.body;

  try {
    const newSpot = new Spot({ title, text, author, exifData, location });
    await newSpot.save();
    return res.status(201).json(newSpot);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler;
