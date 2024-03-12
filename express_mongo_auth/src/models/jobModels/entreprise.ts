import { model, Model, Schema } from "mongoose";
import { User } from "../user";

export interface IStaff {
    user: User,
    role: string,
}

export interface ILinks {
    title: string,
    url: string
}

//declare Enterprise type
export interface IEnterprise {
    links: Array<ILinks>,
    staff: Array<IStaff>,
    name: string,
    description: string,
    logo: string,
    image: string,
    dateOfCreation: Date,
    activity: Array<string>,
    licence: string
}
// define Enterprise schema
const EnterpriseSchema = new Schema<IEnterprise>({
    links: [{
        title: { type: String, required: true },
        url: { type: String, required: true }
    }],
    staff: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, default: "ENTERPRISE_ADMIN" }
    }],
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },
    image: { type: String, required: true },
    dateOfCreation: { type: Date, required: true },
    activity: [],
    licence: { type: String, required: true },

});

EnterpriseSchema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    object.id = this._id;
    return object;
});

export const Enterprise: Model<IEnterprise> = model<IEnterprise>("Enterprise", EnterpriseSchema);