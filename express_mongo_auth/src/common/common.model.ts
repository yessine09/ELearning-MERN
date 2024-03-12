import mongoose from 'mongoose'

//IBSchema représente les propriétés communes à tous les modèles
export interface IBSchema {
  id: string
  createdAt: Date
  updatedAt?: Date
}

// timestamps: true :Mongoose ajoutera automatiquement des champs createdAt et updatedAt à chaque document
export const schemaOptions = { timestamps: true }

//crée un schéma de base vide avec les options spécifiées dans "schemaOptions"
export const baseSchema = new mongoose.Schema({}, schemaOptions)
// =>ce schema bch ykoun base commune pour tous les modéles et aura les champs de timeStamps
