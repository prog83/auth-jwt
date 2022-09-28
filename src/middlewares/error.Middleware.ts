import type { Request, Response, NextFunction } from 'express';

import { ApiError, ValidationError } from 'exceptions';

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log('error', error);

  if (error instanceof ApiError) {
    const { timestamp, status, message, errors } = error;
    res.status(status).json({
      statusCode: status,
      timestamp,
      message,
      errors,
    });
    return;
  }

  if (error instanceof ValidationError) {
    const { timestamp, status, message, errors } = error;
    res.status(status).json({
      statusCode: status,
      timestamp,
      message,
      errors,
    });
    return;
  }

  res.status(500).json({
    statusCode: 500,
    timestamp: new Date(),
    message: 'Внутрішня помилка сервера!',
    errors: [],
  });
};

export default errorMiddleware;
