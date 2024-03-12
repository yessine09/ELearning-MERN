import mongoose, { Schema, model, Model } from 'mongoose';
import { User } from './user';

export interface ILinks {
    title: string;
    url: string;
}

export interface IStudies {
    specialty: string;
    degree: string;
    startDate: Date;
    endDate: Date;
    institution: string;
    document: string;
}

export interface IProfessionalExperience {
    startDate: Date;
    endDate: Date;
    entreprise: string;
    document: string;
    role: string;
}

export interface IMentor {
    links?: Array<ILinks>;
    studies?: Array<IStudies>;
    professional_experience?: Array<IProfessionalExperience>;
    courses?: Array<any>;
    mentor_type?: string;
    user: User;
}

const mentorSchema = new Schema<IMentor>({
    links: [
        {
            title: String,
            url: String,
        },
    ],
    studies: [
        {
            specialty: String,
            degree: String,
            startDate: Date,
            endDate: Date,
            institution: String,
            document: String,
        },
    ],
    professional_experience: [
        {
            startDate: Date,
            endDate: Date,
            entreprise: String,
            document: String,
            role: String,
        },
    ],
    courses: [],
    mentor_type: {
        type: String,
        default: 'INTERNAL',
    },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
});

mentorSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    object.id = this._id;
    return object;
});

export const Mentor: Model<IMentor> = model<IMentor>('Mentor', mentorSchema);
