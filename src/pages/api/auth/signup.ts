import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import { generateToken } from "../../../utils/jwt";
import { connectToDatabase } from "../../../lib/mongoose";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    const token = generateToken(newUser._id);
    return res.status(201).json({ message:"user succesfully created",token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler;
