import { Document, Schema, model } from 'mongoose';
import { lessonModel } from '../index';

export interface IComment extends Document {
  sender: Schema.Types.ObjectId;
  content: string;
  date: Date;
}
export interface IAttachment {
  name: string;
  fileKey: string;
}

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  lesson: Schema.Types.ObjectId | lessonModel.ILesson;
  project: Schema.Types.ObjectId;
  status: string;
  comments?: IComment[];
  assignedTo: Schema.Types.ObjectId | null;
  attachments?: Array<IAttachment>;
  userAttachments?: Array<IAttachment>;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    status: { type: String, enum: ['Open', 'InProgress', 'Review', 'Closed'], default: 'Open' },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", default: null },
    comments: [{
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      content: String,
      date: Date
    }],
    attachments: [
      {
        name: { type: String },
        fileKey: { type: String },
      },
    ],
    userAttachments: [
      {
        name: { type: String },
        fileKey: { type: String },
      },
    ],
  },
  { timestamps: true },
);

export const Task = model<ITask>('Task', TaskSchema);
