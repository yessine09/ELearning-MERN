import mongoose, { Schema, model, Model } from 'mongoose';
import { User } from './user';

export interface IAdmin {
    user: User;
    accessLevel: number;
}

const adminSchema = new Schema<IAdmin>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accessLevel: { type: Number, default: 1 },
});

export const Admin: Model<IAdmin> = model<IAdmin>('Admin', adminSchema);
