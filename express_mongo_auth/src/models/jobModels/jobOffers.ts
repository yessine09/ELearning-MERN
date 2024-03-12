import mongoose, { Document, Schema } from 'mongoose';

export interface IJobOffer extends Document {
    position: string;
    company: Schema.Types.ObjectId;
    location: string;
    description: string;
    keywords: string[];
    salary?: number;
    requirements: string[];
    skills?: string[];
    bonusSkills?: string[];
    recruitmentProcess?: string;
    status: string;
}

export const jobOfferSchema: Schema<IJobOffer> = new Schema(
    {
        position: { type: String, required: true },
        company: { type: Schema.Types.ObjectId, ref: "Enterprise", required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        salary: { type: Number, default: 0 },
        keywords: [{ type: String }],
        requirements: [{ type: String }],
        skills: [{ type: String }],
        bonusSkills: [{ type: String }],
        recruitmentProcess: {
            type: String
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

jobOfferSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

const JobOffer = mongoose.model<IJobOffer>('JobOffer', jobOfferSchema);
export default JobOffer;