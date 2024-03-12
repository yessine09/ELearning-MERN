import mongoose, { Document } from "mongoose";
import { IEnrollment } from "./enrollment";
import { ILesson } from "./lesson";

export interface IWeek {
    _id: string;
    start: Date;
    end: Date;
    lessons: ILesson[];
}


export interface IProgram extends Document {
    title?: string;
    description?: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    mentor: mongoose.Schema.Types.ObjectId;
    status: "published" | "archived" | "unpublished";
    enrollments?: IEnrollment[];
    deadline?: Date;
    weeks: Array<IWeek>;
}

const programSchema = new mongoose.Schema<IProgram>({
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    status: { type: String, enum: ["published", "unpublished", "archived"], required: true, default: "unpublished" },
    enrollments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment", required: true },
    ],
    deadline: { type: Date },
    weeks: [
        {
            start: { type: Date },
            end: { type: Date },
            lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
        },
    ],
}, { timestamps: true });

programSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Record<string, any>) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Program = mongoose.model<IProgram>("Program", programSchema);
export default Program;