import BaseError, { ErrorPayload } from './baseError'

export class NotFoundError extends BaseError {
  constructor(errorPayload = { msg: 'resource does not exist' }) {
    super(404, 'not found', errorPayload)
  }
}

export class BadRequestError extends BaseError {
  constructor(errorPayload: ErrorPayload) {
    super(400, 'bad request', errorPayload)
  }
}
