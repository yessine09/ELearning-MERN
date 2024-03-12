import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import { config } from '../config'
import { CodePayload, RefreshToken } from '../types/auth.types'

export const generateAccessToken = (data: any) =>
  jwt.sign(data, config.jwt.secret, { expiresIn: `${config.jwt.accessExpirationMinutes}m` })

export const generateRefreshToken = async (): Promise<RefreshToken> => {
  const code = uuid()
  const refreshTokenExpiry = new Date(
    Date.now() + parseInt(config.jwt.refreshExpirationDays) * 86400000
  )

  return {
    token: await bcrypt.hash(code, config.saltRound),
    expiresIn: refreshTokenExpiry,
  }
}

export const generateCode = (expireIn: number): CodePayload => {
  const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  return {
    code: code.toString(),
    expiresIn: new Date(
      Date.now() + expireIn * 60000
    ).getTime(),
  }
}

