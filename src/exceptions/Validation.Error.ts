import { ValidationError as ClassValidationError } from 'class-validator';

export default class ValidationError extends Error {
  timestamp: Date;

  status: number = 400;

  errors: Array<unknown> = [];

  constructor(errors: Array<ClassValidationError>) {
    const err = errors.map(({ property, constraints }) => ({ path: property, constraints }));
    const message = Object.values(err[0].constraints ?? {}).join('; ');

    super(message);

    this.timestamp = new Date();
    this.errors = err;
  }
}
