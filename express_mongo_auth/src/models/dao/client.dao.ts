import { clientModel } from '../index';
import Client from '../client';
import mongoose, { Mongoose, Schema } from 'mongoose';

export default class DAOclient {

    static async createClientProfile(user: clientModel.IClient): Promise<clientModel.IClient> {
        const createdUser = await Client.create(user);
        createdUser.clientId = { type: Object(createdUser._id), ref: 'User' };
        return createdUser;
    }

    static async updateClientProfile(user: clientModel.IClient): Promise<clientModel.IClient> {
        console.info("The use we got", JSON.stringify(user));
        const updateUser = await clientModel.default.updateOne({ clientId: user.clientId }, {
            $push: {
                "professional_experience.data": user.professional_experience.data,
                "skillsets.data": user.skillsets.data,
                "softSkills.data": user.softSkills.data,
                "studies.data": user.studies.data
            },
        }, { new: true });
        console.info(JSON.stringify(updateUser));
        return user;
    }

    static async updateClientBasicInfo(client:clientModel.IClient,userId:string) : Promise<clientModel.IClient | null> {
        console.info("updateClientBasicInfo");
        const updateUser = await clientModel.default.findOneAndUpdate({ clientId: userId }, {
            $set: {
                gender : client.gender,
                date_of_birth : client.date_of_birth,
                profession : client.profession,
                phone : client.phone
            }
        },{new : true});
        return updateUser;
    }

    static async updateClientAvatar(user: String, fileKey: String) {
        try {
            const updateUser = await clientModel.default.findOneAndUpdate({ clientId: new mongoose.Types.ObjectId(user.toString()) }, {
                $set: {
                    "avatar": fileKey
                }
            }, { new: true });
            console.info("we did update the avatar ", JSON.stringify(updateUser));
            return updateUser;
        } catch (error) {
            console.error("Error Updating client avatar : ", JSON.stringify(error))
            return null;
        }

    }

    static async getClient(clientId: string): Promise<clientModel.IClient | null> {
        try {
            const client = await clientModel.default.findOne({ clientId: clientId }).exec();
            return client;
        } catch (e) {
            console.error("Error getting client : ", JSON.stringify(e));
            return null;

        }
    }

    static async getClientByUserId(userId: string): Promise<clientModel.IClient | null> {
        try {
            return await clientModel.default.findOne({ clientId: userId }).populate("clientId").exec();
        } catch (e) {
            console.error("Error getClientByUserId : ", JSON.stringify(e));
            return null;

        }
    }

    static async checkClientProfile(userId: string): Promise<boolean> {
        try {
            const client = await DAOclient.getClient(userId)
            console.info("The client we got", JSON.stringify(client));
            if (client) {
                return true;
            }
            return false;
        } catch (e) {
            console.error("Error checkClientProfile : ", JSON.stringify(e));
            return false;
        }

    }
}
