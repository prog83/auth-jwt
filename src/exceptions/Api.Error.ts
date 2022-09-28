export default class ApiError extends Error {
  timestamp: Date;

  constructor(public status: number, message: string, public errors: Array<unknown> = []) {
    super(message);

    this.timestamp = new Date();
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors: Array<unknown> = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError(message: string = 'Користувач не авторизован!') {
    return new ApiError(401, message);
  }

  static ForbiddenError(message: string = 'Доступ заборонено!') {
    return new ApiError(403, message);
  }

  static NotFoundError(message: string) {
    return new ApiError(404, message);
  }
}
