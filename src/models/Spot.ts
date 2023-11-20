import mongoose, { Document, Model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

interface ISpot extends Document {
  title: string;
  text: string;
  author: ObjectId;  // Using ObjectId for author reference
  exifData: {
    ISO: string;
    shutterSpeed: string;
    aperture: string;
    focalLength: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SpotSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exifData: {
    ISO: String,
    shutterSpeed: String,
    aperture: String,
    focalLength: String,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
}, { timestamps: true });

const Spot: Model<ISpot> = mongoose.models.Spot || mongoose.model<ISpot>('Spot', SpotSchema);

export default Spot;
