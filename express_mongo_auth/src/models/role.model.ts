import mongoose from 'mongoose'
import { commonModelConfig } from '../common'

const requiredString = {
  type: String,
  required: true,
}

export interface Role extends commonModelConfig.IBSchema {
  resources: any
  name: string
}

const schema = new mongoose.Schema<Role>(
  {
    ...commonModelConfig.baseSchema.obj,
    name: requiredString,
  },
  commonModelConfig.schemaOptions
)

export default mongoose.model<Role>('role', schema)
