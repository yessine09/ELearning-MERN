import express from 'express'
import UserServices from '../services/user.services'
import { HttpStatus, errorTypes } from '../types'
import { hash } from '../utils'
import codeModel from '../models/code'
import { roleModel } from '../models'
import _ from 'lodash'


export default class UserMiddlewares {
    static async checkUserDoesNotExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserServices.getUserByEmail(req.body.email)
        if (user)
            next(new errorTypes.BadRequestError({ msg: 'user already exist check your credentials' }))

        next()
    }

    static async checkUserNotExistByEmail(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserServices.getUserByEmail(req.body.contact)
        if (!user)
            next(new errorTypes.BadRequestError({ msg: 'user does not exist' }))

        next()
    }

    static async checkUserExistingByEmail(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserServices.getUserByEmail(req.body.email)
        if (!user) {
            next(new errorTypes.BadRequestError({ msg: 'user doesnt exist, check your credentials' }))
        }

        Object.assign(req.body, { user })
        next()
    }

    static async checkUserExistByEmail(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserServices.getUserByEmail(req.body.email)
        if (!user) {
            next(new errorTypes.BadRequestError({ msg: 'user already exist, check your credentials' }))
        }

        Object.assign(req.body, { user })
        next()
    }

    static async checkUserExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserServices.getUserById(req.body.authPayload.userId)
        if (!user)
            next(new errorTypes.BadRequestError({ msg: 'cannot be authorized, user does not exist' }))

        Object.assign(req.body, { user })
        next()
    }

    static async checkUserPassword(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const { password: oldPassword, user } = req.body
        const isSame = await hash.compare(oldPassword, user.password)
        if (isSame) next()
        else
            next(new errorTypes.BadRequestError({ msg: 'cannot be authorized, check your credentials' }))
    }

    static checkRole(roleName: string): express.RequestHandler {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const authPayload = req.body.authPayload || req.headers.authPayload;
            if (!authPayload || !authPayload.roles) {
                next(
                    new errorTypes.UnauthorizedRequest({
                        msg: `Cannot be authorized, missing auth payload or roles`,
                    })
                );
                return;
            }

            const roles = authPayload.roles as roleModel.Role[];
            const targetRole = roles.find((role) => role.name === roleName);
            if (!targetRole) {
                next(
                    new errorTypes.UnauthorizedRequest({
                        msg: `Cannot be authorized, you are not an ${roleName}`,
                    })
                );
                return;
            }

            Object.assign(req.body, { targetRole });
            next();
        };
    };



    static async verifyCode(req: express.Request, res: express.Response, next: express.NextFunction) {
        const { code } = req.body;

        const existingCode = await codeModel.findOne({ code }).exec();

        if (!existingCode) {
            // handle code not found
            return next(new errorTypes.BadRequestError({ msg: 'Invalid verification code' }));
        }
        const now = new Date();
        if (now.getTime() > existingCode.expiresIn.getTime()) {
            // handle expired code
            return next(new errorTypes.BadRequestError({ msg: 'Verification code has expired resend code ?' }));
        }

        // The code is valid, so we can delete it from the database to prevent it from being used again
        await codeModel.deleteOne({ _id: existingCode._id }).exec();

        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            msg: 'you have succefully verified your account'
        });
    }

    static checkPermissions(resourceName: string, permissions: any) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const targetRole = req.headers['x-target-role'];
            const resource = req.headers['x-resource'];

            if (!targetRole || !resource) {
                return next(
                    new errorTypes.UnauthorizedRequest({
                        msg: 'cannot be authorized, missing targetRole or resources',
                    })
                );
            }
            next()
        }

    }
}





