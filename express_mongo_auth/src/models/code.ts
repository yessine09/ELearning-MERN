import { Document, model, Schema } from 'mongoose'

export interface CodePayload {
    code: string
    expiresIn: number
}

export interface CodeModel extends Document {
    code: string
    expiresIn: Date
}

const codeSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        required: true,
    },
})
const codeModel = model<CodeModel>('Code', codeSchema)
export default codeModel;
