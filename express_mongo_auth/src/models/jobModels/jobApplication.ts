import mongoose, { Schema, Document } from 'mongoose';

export interface IJobApplication extends Document {
    jobOfferId: mongoose.Schema.Types.ObjectId;
    applicantId: mongoose.Schema.Types.ObjectId;
    resume: string;
    coverLetter: string;
    status: 'Pending' | 'In Review' | 'Hired' | 'Rejected';
}

export const JobApplicationSchema: Schema = new Schema({
    jobOfferId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer', required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Review', 'Hired', 'Rejected'], default: 'Pending' },
});

const JobApplication = mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);

export default JobApplication;
