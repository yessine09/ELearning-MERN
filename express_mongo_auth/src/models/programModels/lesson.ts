import mongoose, { Document } from "mongoose";

export interface ILesson extends Document {
    title: string;
    description?: string;
    content: string;
    video?: string;
    references?: string[];
    duration?: number;
    keywords?: string[];
    challenges?: mongoose.Schema.Types.ObjectId[];
    createdBy?: mongoose.Schema.Types.ObjectId;
    attachments?: Array<{
        name: string;
        fileKey: string;
    }>;
}

const lessonSchema = new mongoose.Schema<ILesson>({
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String, required: true },
    video: { type: String },
    duration: { type: Number },
    references: { type: [String] },
    keywords: { type: [String] },
    attachments: [{
        name: { type: String },
        fileKey: { type: String }
    }],
    challenges: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
}, { timestamps: true });

lessonSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Record<string, any>) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Lesson = mongoose.model<ILesson>("Lesson", lessonSchema);

export default Lesson;