import { Document, model, Model, Schema } from 'mongoose';

export interface ISkillset {
    skill: string;
    level: string;
    isSoftSkill: boolean;
}

export interface ILinks {
    title: string;
    url: string;
}

export interface ISoftSkill {
    skill: string;
}

export interface IAcademicTraining {
    local: string;
    specialty: string;
    degree: string;
    startDate: Date;
    endDate: Date;
    establishment: string;
    student: boolean;
    document?: string;
}

export interface IProfessionalExperience {
    period: string;
    company: string;
    job: string;
    local: string;
    document?: string;
}

export interface IAddress {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

export interface IClient {
    clientId: { type: Schema.Types.ObjectId, ref: 'User' };
    avatar: string;
    phone : string;
    profession: string;
    gender : string;
    date_of_birth : Date;
    address : IAddress,
    softSkills: { data: Array<ISoftSkill> };
    skillsets: { data: Array<ISkillset> };
    studies: { data: Array<IAcademicTraining> };
    professional_experience: { data: Array<IProfessionalExperience> };
}

export const ClientSchema: Schema = new Schema<IClient>({
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    avatar: { type: String },
    phone : {type : String},
    profession : {type:String},
    gender : {type : String},
    date_of_birth : {type : Date},
    address : {
        street : {type : String},
        city : {type : String},
        state :{type:String},
        country: {type:String},
        zip: {type:String}
    },
    softSkills: { data: [{ skill: { type: String, required: true, unique: true } }] },
    skillsets: {
        data: [{
            skill: { type: String, required: true, unique: true },
            level: { type: String, required: true },
            isSoftSkill: { type: Boolean, required: true },
        }]
    },
    studies: {
        data: [{
            local: { type: String, required: true },
            specialty: { type: String, required: true },
            degree: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            establishment: { type: String, required: true },
            student: { type: Boolean, required: true },
            document: { type: String },
        }]
    },
    professional_experience: {
        data: [{
            company: { type: String, required: true },
            job: { type: String, required: true },
            local: { type: String, required: true },
            period: { type: String, required: true },
            document: { type: String },
        }]
    },
});

ClientSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.userId = _id;
    return object;
});

const Client: Model<IClient> = model<IClient>("Client", ClientSchema);
export default Client;

