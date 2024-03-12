import mongoose from 'mongoose'
import { commonModelConfig } from '../common'
import { Role } from './role.model'

//definit un objet qui sera utilisé comme configuration de propriétés
const requiredString = {
  type: String,
  required: true,
}

//Les interfaces en TypeScript fournissent un moyen de déclarer la structure d'un objet,qui facilite le développement, la compréhension et la maintenance du code.
export interface User extends commonModelConfig.IBSchema {
  email: string
  password: string
  firstName: string
  lastName: string
  verified: boolean
  roles: Role[] | string[]
}

//créer un objet de type PartialUser qui ne contient que certaines propriétés de l'interface User,
//=> et ces propriétés peuvent être optionnelles!
export type PartialUser = Partial<User>

const schema = new mongoose.Schema<User>(
  {
    // utilisation spread operator pour inclure tous les prop du baseSchema dans nouveau schema
    ...commonModelConfig.baseSchema.obj,
    //.obj:n'est pas necessaire, convention choisie pour rendre explicite que lon référence les propriétés du schéma.
    email: requiredString,
    password: requiredString,
    firstName: requiredString,
    lastName: requiredString,
    verified: {
      type: Boolean,
      default: false,
      //default:si aucune valeur n'est fournie pour la propriété
    },
    // roles définie comme un tableau d'identifiants d'objets MongoDB qui font référence à des documents,chaque user associcé a un ou + roles
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }],
    // => ref :creation d'association entre user et roles
  },
  commonModelConfig.schemaOptions
  // Ajoute les options de configuration du schéma
)

export default mongoose.model<User>('users', schema)
