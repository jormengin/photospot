import mongoose,{ Model, Schema, ObjectId } from 'mongoose';

interface IComment extends Document {
    text: string;
    spot: ObjectId;
    commentor: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema: Schema = new mongoose.Schema({
    text: { type: String, required: true },
    spot: { type: mongoose.Schema.Types.ObjectId, ref: 'Spot', required: true },
    commentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);

export default Comment;