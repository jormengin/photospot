import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectToDatabase();
    const isConnected = await db.command({ ping: 1 });
    res.status(200).json({ message: 'Successfully connected to MongoDB', isConnected });
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to MongoDB', error });
  }
}

