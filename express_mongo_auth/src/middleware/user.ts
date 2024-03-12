import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../config/errors'
import userModel from '../models/user'

export const checkUserDoesNotExist = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body
  const existingUser = await userModel.findOne({ email })
  if (existingUser) {
    return next(new BadRequestError({ msg: 'user already exist', email }))
  }

  next()
}

export const checkCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const existingUser = await userModel.findOne({ email })
  if (!existingUser) return next(new BadRequestError({ msg: 'invalid credentials' }))

  const isValidPassword = await bcrypt.compare(password, existingUser.password)
  if (!isValidPassword) return next(new BadRequestError({ msg: 'invalid credentials' }))

  Object.assign(req.body, { user: existingUser })
  return next()
}
