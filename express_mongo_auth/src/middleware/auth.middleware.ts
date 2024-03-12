import express from 'express'
import jwt from 'jsonwebtoken'
import AuthServices from '../services/auth.services'
import { hash } from '../utils'
import { errorTypes } from '../types'
import { config, tokens } from '../config'

export interface CustomRequest extends express.Request {
    token: string | jwt.JwtPayload;
    userId: string;
    roles: [];
}

export default class AuthMiddlewares {
    static async checkPasswordIsValid(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const { password, user } = req.body
        const isSame = await hash.compare(password, user.password)
        if (!isSame) {
            next(new errorTypes.BadRequestError({ msg: 'cannot be authorized, check your credentials' }))
        }

        next()
    }

    static async auth(req: express.Request, res: express.Response, next: express.NextFunction) {
        const authHeader = req.headers.authorization || ''
        if (!authHeader)
            next(new errorTypes.BadRequestError({ msg: 'Authorization header must be provided' }))

        const token = authHeader.split('Bearer ')[1]
        if (!token)
            next(new errorTypes.BadRequestError({ msg: 'Authorization token must be: Bearer [token]' }))

        let payload = { accessToken: token, userId: '', roles: [], exp: 0 }
        try {
            const { userId, roles, exp } = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;
            payload = { ...payload, userId, roles, exp: exp || 0 };

            (req as CustomRequest).userId = userId;
            (req as CustomRequest).roles = roles;
        } catch (err) {
            next(new errorTypes.BadRequestError({ msg: 'Invalid/Expired token' }))
        }
        Object.assign(req.body, { authPayload: payload })
        next()
    }

    static async checkRefreshToken(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const token = await AuthServices.getRefreshToken(req.cookies[tokens.REFRESH])
        if (!token) next(new errorTypes.BadRequestError({ msg: 'invalid or expired refresh token' }))

        const expiresIn = token?.expiresIn as Date
        if (expiresIn < new Date(Date.now()))
            next(new errorTypes.BadRequestError({ msg: 'invalid or expired token' }))

        const authPayload = { userId: token?.owner, refreshToken: token?.token }
        Object.assign(req.body, { authPayload })
        next()
    }


}
