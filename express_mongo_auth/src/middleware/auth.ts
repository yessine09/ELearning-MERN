import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import configs from '../config/configs'
import { BadRequestError } from '../config/errors'

type JWTPayload = {
  userId: string
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization
  if (!authHeader) return next(new BadRequestError({ msg: 'auth header is required' }))

  const splittedAuthToken = authHeader.split('Bearer ')
  if (splittedAuthToken.length !== 2)
    return next(new BadRequestError({ msg: 'auth header must respect this format [Bearer token]' }))

  const [_, token] = splittedAuthToken
  if (!token) return next(new BadRequestError({ msg: 'token is required' }))

  let payload: JWTPayload

  try {
    payload = jwt.verify(token, configs.jwt.secret) as JWTPayload
  } catch (error) {
    return next(new BadRequestError({ msg: 'invalid/expired token' }))
  }

  Object.assign(req.body, { authPayload: payload })
  return next()
}
