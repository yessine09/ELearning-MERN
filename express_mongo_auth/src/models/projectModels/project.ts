import { model, Schema, Document } from "mongoose";
import { ITask } from './Task';

export interface IProject extends Document {
    title: string;
    description?: string;
    mentor: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    lesson: Schema.Types.ObjectId;
    tasks?: Schema.Types.ObjectId[] | ITask[];
    status: "active" | "completed";
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String },
    mentor: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active",
    },
}, { timestamps: true });

const Project = model<IProject>("Project", projectSchema);

export default Project;