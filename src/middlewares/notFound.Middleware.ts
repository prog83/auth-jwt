import type { Request, Response, NextFunction } from 'express';
import { ApiError } from 'exceptions';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = ApiError.NotFoundError(`Ресурс не знайдено!`);
  next(error);
};

export default notFound;
