import express from 'express'
import Joi from 'joi'
import _ from 'lodash'
import { errorTypes } from '../types'

export default (schema: any) =>
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const validSchema = _.pick(schema, ['params', 'query', 'body'])
        const object = _.pick(req, Object.keys(validSchema))
        const { value, error } = Joi.compile(validSchema)
            .prefs({ errors: { label: 'key' }, abortEarly: false })
            .validate(object)

        if (error) {
            const errorPayload = error.details.reduce(
                (prev, { message, path }) => ({
                    ...prev,
                    [path[1]]: message.split('"').join('').trim(),
                }),
                {}
            )

            return next(new errorTypes.BadRequestError(errorPayload))
        }
        Object.assign(req.body, value)
        return next()
    }
