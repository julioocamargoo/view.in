export default class HttpError extends Error {
  code: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.code = statusCode;
  }
}
