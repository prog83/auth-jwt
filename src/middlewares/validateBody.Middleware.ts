import type { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';

import { ValidationError } from 'exceptions';

const validateBody =
  <T extends {}>(targetClass: ClassConstructor<T>, groups: Array<string> = []) =>
  async (req: Request<unknown, unknown, T>, res: Response, next: NextFunction) => {
    try {
      const body = plainToInstance(targetClass, req.body, { groups });
      // Object.setPrototypeOf(req.body, targetClass.prototype)
      const errors = await validate(body, {
        groups,
        validationError: {
          target: false,
          value: false,
        },
      });
      if (errors.length > 0) {
        throw new ValidationError(errors);
      }
      req.body = body;

      next();
    } catch (error) {
      next(error);
    }
  };

export default validateBody;
