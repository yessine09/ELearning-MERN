import mongoose from "mongoose";
import { DAOclient } from "../models";
import { IClient } from "../models/client";
import { ProfileTypes } from "../types";

export default class clientServices {
    //how to create a client profile
    static async createProfile(client: IClient): Promise<ProfileTypes.createProfile> {
        const result = await DAOclient.createClientProfile({
            ...client,
        });
        return { userId: result.clientId.toString() };
    }

    //Updating a client's profile
    static async updateProfile(client: IClient): Promise<ProfileTypes.updateProfile> {
        console.info("Client Service : updateProfile");
        const result = await DAOclient.updateClientProfile({ ...client, });
        return { userId: result.clientId.toString() };
    }

    static async updateBasicInfo(client: IClient,clientId:string): Promise<IClient | null> {
        console.info("Client Service : updateBasicInfo");
        const result = await DAOclient.updateClientBasicInfo(client,clientId);
        return result;
    }

    //upload avatar to client
    static async uploadAvatar(client: string, avatarKey: string): Promise<ProfileTypes.updateAvatar> {
        console.info("Client Service : uploadAvatar");
        const result = await DAOclient.updateClientAvatar(client, avatarKey);
        return { userId: client, avatar: avatarKey };
    }

    static async getClientById(clientId: string): Promise<IClient | null> {
        console.info("Client Service : getClientById");
        const result = await DAOclient.getClient(clientId);
        return result;
    }

    static async getClientByUserId(userId: string): Promise<IClient | null> {
        console.info("Client Service : getClientByUserId");
        const result = await DAOclient.getClientByUserId(userId);
        return result;
    }

    static async checkProfile(userId: string) {
        console.info("Client Service : checkProfile");
        const result = await DAOclient.checkClientProfile(userId);
        return { userId: userId, isCompleted: result };
    }
}
