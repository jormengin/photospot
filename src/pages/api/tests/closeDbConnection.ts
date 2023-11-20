import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

//function to close the connection to the database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
    await mongoose.connection.close();
    const isDisconnected = mongoose.connection.readyState === 0;
    res.status(200).json({ message: 'Connection closed', isDisconnected });
    }
    catch(error){
        res.status(500).json({ message: 'Failed to disconnect from MongoDB', error });
    }
}


