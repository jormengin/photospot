// File: /src/pages/api/auth/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongoose';
import User from '../../../models/User';
import { generateToken } from '../../../utils/jwt';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = generateToken(user._id);

  res.status(200).json({ token });
}

export default handler;
