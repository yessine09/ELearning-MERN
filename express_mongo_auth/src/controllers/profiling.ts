import express from 'express'
import { HttpStatus } from '../types';
import { UserServices, clientServices } from '../services';
import UploadServices from '../services/upload.services';
import { CustomRequest } from '../middleware/auth.middleware';
export default class ProfilingController {

    static async createProfile(req: CustomRequest, res: express.Response) {
        const payload = await clientServices.createProfile(req.body)
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            data: payload,
        })
    }

    static async updateProfile(req: CustomRequest, res: express.Response) {
        console.info("ProfilingController : updateProfile")
        const payload = await clientServices.updateProfile(req.body)
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            data: payload
        })
    }

    static async updateAvatar(req: CustomRequest, res: express.Response) {
        const result = await UploadServices.uploadClientAvatar(req);
        const payload = await clientServices.uploadAvatar(req.userId, result.key!);
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            data: payload
        })
    }

    static async downloadAvatar(req: CustomRequest, res: express.Response) {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            data: "",
            stream: res.pipe
        })
    }

    static async updateBasicInfo(req:CustomRequest,res:express.Response) {
        const payload = await clientServices.updateBasicInfo(req.body,req.userId);
        return res.status(HttpStatus.OK).json({
            status : HttpStatus.OK,
            data : payload
        })
    }

    static async getClientInfo(req: CustomRequest, res: express.Response) {
        const userId = req.params.userId;
        const client = await clientServices.getClientById(userId)
        const user = await UserServices.getUserById(userId);
        console.log(JSON.stringify(client))
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: {
                client : client,
                user : user
            }
        });


    }

    //check profile
    static async checkProfile(req: CustomRequest, res: express.Response) {
        const userId = req.params.userId;
        const payload = await clientServices.checkProfile(userId)
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            data: payload
        })
    }
}
