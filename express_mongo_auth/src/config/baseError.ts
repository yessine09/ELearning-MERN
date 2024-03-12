export type ErrorPayload = Record<string, any>

export default class BaseError extends Error {
  public readonly statusCode: number
  public readonly errorPayload: ErrorPayload

  constructor(statusCode: number, message: string, errorPayload: ErrorPayload) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)

    this.statusCode = statusCode
    this.errorPayload = errorPayload
  }
}
