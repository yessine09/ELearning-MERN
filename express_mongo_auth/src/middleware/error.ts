import express from 'express'
import BaseError from '../config/baseError'

export default (
  err: BaseError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { statusCode, message, errorPayload } = err

  const response = {
    code: statusCode,
    message,
    error: errorPayload,
  }
  console.error('Error Middleware:', err); // Add this line for additional logging
  res.status(statusCode).send(response)
}
