import mongoose, { Document, Schema } from 'mongoose';

export interface IEnrollment extends Document {
    client: mongoose.Schema.Types.ObjectId;
    mentor?: mongoose.Schema.Types.ObjectId;
    partner?: mongoose.Schema.Types.ObjectId;
    program: mongoose.Schema.Types.ObjectId;
    status: string;
    installments?: number[];
    startDate: Date; // Add the startDate field
    endDate: Date;
}

export const enrollmentSchema: Schema<IEnrollment> = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        partner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Enterprise'
        },
        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Program',
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'unpaid', 'paid'],
            default: 'unpaid',
        },
        installments: {
            type: [Number],
            default: [],
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        }
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

enrollmentSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);
export default Enrollment;
