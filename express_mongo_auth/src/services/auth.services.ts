import { config } from '../config'
import * as AuthTypes from '../types/auth.types'
import { hash, token } from '../utils/index'
import { refreshModel, DAORefresh } from '../models/index'
import { errorTypes } from '../types'
import DAOUser from '../models/dao/user.dao'
import { RoleServices, destroyAccount, sendEmail } from '../services/index'
import codeModel, { CodeModel } from '../models/code'
import express from 'express'
import { Twilio } from 'twilio';



export default class AuthServices {
    static async generateTokens(userId: string, rolesIds: string[]): Promise<AuthTypes.AuthPayload> {
        const data = { userId, roles: await RoleServices.getRoles(rolesIds) }
        return {
            access: token.generateAccessToken(data),
            refresh: await token.generateRefreshToken(),
        }
    }

    static async createRefreshToken(
        refreshToken: AuthTypes.RefreshToken,
        owner: string
    ): Promise<refreshModel.Refresh> {
        return await DAORefresh.createRefresh(refreshToken, owner)
    }

    static async deleteRefreshToken(refreshToken: string) {
        return await DAORefresh.deleteToken(refreshToken)
    }


    static async getRefreshToken(token: string): Promise<refreshModel.Refresh | null> {
        return await DAORefresh.getRefreshToken(token)
    }

    static async updateRefreshToken(
        oldToken: string,
        newToken: AuthTypes.RefreshToken
    ): Promise<refreshModel.Refresh | null> {
        return await DAORefresh.updateRefreshToken(oldToken, newToken)
    }

    static async verifyEmail(email: string): Promise<AuthTypes.VerifyEmailPayload> {
        const { code, expiresIn } = token.generateCode(config.jwt.verifyEmailExpirationMinutes)
        try {
            sendEmail({
                to: email,
                from: config.emailSender,
                subject: 'Confirmation email',
                text: `this is your confirmation code: ${code} - if you don't verify your account in a day, it will be destroyed automatically`,
                html: undefined
            })

            destroyAccount(email)
        } catch (error) {
            throw new errorTypes.InternalServerError()
        }

        return { expiresIn: new Date(expiresIn) }
    }

    static async confirmEmail(email: string): Promise<{ [userId: string]: string }> {
        const user = await DAOUser.updateUser({ email }, { verified: true })
        return { userId: user?.id || 'undefined' }
    }

    static async forgetPasswordByEmail(email: string): Promise<AuthTypes.ForgetPasswordPayload> {
        const { code, expiresIn } = token.generateCode(config.jwt.resetPasswordExpirationMinutes)

        try {
            const newCode = new codeModel({
                email,
                code,
                expiresIn
            });

            await newCode.save();
            sendEmail({
                to: email,
                from: config.emailSender,
                subject: 'password reset code',
                text: `this is your password reset code: ${code}`,
                html: undefined
            })

        } catch (error) {
            console.log(error)
            throw new errorTypes.InternalServerError()
        }

        return { expiresIn: new Date(expiresIn) }
    }

    static async forgetPasswordByFn(number: string) {
        const client = new Twilio(config.twilio.accountSid, config.twilio.authToken);
        const { code, expiresIn } = token.generateCode(config.jwt.resetPasswordExpirationMinutes)
        try {
            const newCode = new codeModel({
                number,
                code,
                expiresIn
            });

            await newCode.save();
            client.messages.create({
                body: `This is your password reset code: ${code}`,
                from: config.twilio.senderPhoneNumber,
                to: `+216${number}`
            }).then(message => console.log(message.sid));;

            return { expiresIn: new Date(expiresIn) }
        } catch (error) {
            console.log(error)
            throw new errorTypes.InternalServerError()
        }
    }





    static async resetPassword(email: string, password: string): Promise<void> {
        const hashedPassword = await hash.hash(password)
        await DAOUser.updateUser({ email }, { password: hashedPassword })
    }

    static async clearRefreshTokens(id: string): Promise<void> {
        await DAORefresh.clearTokens({ owner: id })
    }

    static async verifyCode(req: express.Request, res: express.Response, next: express.NextFunction) {
        const { code } = req.body;
        try {
            const existingCode = await codeModel.findOne({ code }).exec();
            if (!existingCode) {
                next(new errorTypes.BadRequestError({ msg: 'code not found' }));
                return;
            }
            const now = new Date();
            if (now.getTime() > existingCode.expiresIn.getTime()) {
                await codeModel.deleteOne({ _id: existingCode._id }).exec();
                next(new errorTypes.BadRequestError({ msg: 'code expired' }));
                return;
            }
            await codeModel.deleteOne({ _id: existingCode._id }).exec();
            next();
        } catch (error) {
            next(new errorTypes.BadRequestError({ msg: 'code not found' }));
        }
    }

        
}
