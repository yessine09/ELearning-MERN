import mongoose, { Schema } from "mongoose";

interface IAnswers {
    _id: mongoose.Schema.Types.ObjectId;
    lesson: mongoose.Schema.Types.ObjectId;
    userid: mongoose.Schema.Types.ObjectId;
    question: mongoose.Schema.Types.ObjectId;
    score: number;
    answers: Schema.Types.Mixed[];
}

const AnswersSchema = new Schema({
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    score: { type: Number, default: 0 },
    answers: [{ type: [Schema.Types.Mixed], required: true }]
});

const Answers = mongoose.model<IAnswers>('Answers', AnswersSchema);

export { IAnswers, Answers };