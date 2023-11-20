import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongoose';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
   await connectToDatabase();
   const isConnected = mongoose.connection.readyState === 1;
    res.status(200).json({ message: 'Connection successful', isConnected });
    } catch (error) {
    res.status(500).json({ message: 'Failed to connect to MongoDB', error });
  }
}

