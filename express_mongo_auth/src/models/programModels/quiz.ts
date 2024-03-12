import mongoose, { Schema, Document } from 'mongoose';
import { IQuestion, Question } from './question';

// Define interface for quiz document
interface IQuiz extends Document {
    _id: mongoose.Schema.Types.ObjectId,
    lessonId: string;
    userId: string;
    title: string;
    description: string;
    duration: number;
    document: string;
    deadline: Date;
    questions: IQuestion[];
}


// Define Mongoose schema for quiz document
const quizSchema = new Schema({
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
    },
    deadline: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
    },
    document: {
        type: String,
        required: true,
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question',
        required: true,
    },
}, { timestamps: true });

// Create Mongoose model for quiz document
const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);

export { IQuiz, Quiz };
