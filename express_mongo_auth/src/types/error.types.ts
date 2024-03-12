import BaseError from '../config/baseError'
import { HttpStatus, HttpMessages, ErrorPayload } from '../types/index'

export class InternalServerError extends BaseError {
  constructor(errorPayload = { msg: 'An internal error has occured' }) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessages.H500, errorPayload)
  }
}

export class BadRequestError extends BaseError {
  constructor(errorPayload: ErrorPayload) {
    super(HttpStatus.BAD_REQUEST, HttpMessages.H400, errorPayload)
  }
}

export class NotFoundError extends BaseError {
  constructor(errorPayload = { msg: 'resource does not exist' }) {
    super(HttpStatus.NOT_FOUND, HttpMessages.H404, errorPayload)
  }
}

export class UnauthorizedRequest extends BaseError {
  constructor(errorPayload = { msg: 'You are not authorized to access this route' }) {
    super(HttpStatus.UNAUTHORIZED, HttpMessages.H401, errorPayload)
  }
}
