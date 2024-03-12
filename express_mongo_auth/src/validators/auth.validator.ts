import Joi from 'joi'
import { password } from './custom.validation'

export default class AuthValidators {
    static createAccount = {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(password),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            // role: Joi.string().valid('admin', 'user', 'mentor', 'entreprise', 'content_creator').required(),

        }).unknown(),
    }

    static login = {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        }).unknown(),
    }

    static confirmEmail = {
        body: Joi.object().keys({
            code: Joi.string().required(),
        }).unknown(),
    }

    static confirmCode = {
        body: Joi.object().keys({
            code: Joi.string().length(6).required(),
        }).unknown(),
    }


    static forgetPasswordByEmail = {
        body: Joi.object().keys({
            contact: Joi.string().required().email(),
        }).unknown(),
    }
    static forgetPasswordByFn = {
        body: Joi.object().keys({
            contact: Joi.string().length(8).required(),
        }).unknown(),
    }

    static resetPassword = {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(password),
        }).unknown(),
    }
}
