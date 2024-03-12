import mongoose, { Schema } from "mongoose";

interface IQuestion {
    _id: mongoose.Schema.Types.ObjectId,
    text: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options: string[];
    image?: string;
    correctOption: number | string;
}

const questionSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'short-answer'],
        required: true,
    },
    image: {
        type: String,

    },
    options: {
        type: [String]
    },
    correctOption: {
        type: [Schema.Types.Mixed],
        required: true,
    },
});

const Question = mongoose.model<IQuestion>('Question', questionSchema);

export { IQuestion, Question };