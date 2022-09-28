import { QueryFailedError } from 'typeorm';

import { DatabaseError } from 'pg';
import { PostgresErrorCode } from 'helpers';

import ApiError from './Api.Error';

const getMessageUniqueViolation = (detail: string) => {
  const [str] = detail.match(/(:?\(.+\)=\(.+\))/g) ?? [];
  const [path, value] = str.split(')=(').map((item) => item.replace(/^\(|\)$/g, '')) ?? [];

  return { path, value };
};

export default class PostgresError {
  static getInstance(error: QueryFailedError) {
    const { driverError } = error;
    const { code, detail } = driverError as DatabaseError;

    if (!code || !detail) {
      return error;
    }

    switch (code) {
      case PostgresErrorCode.UniqueViolation: {
        const { path, value } = getMessageUniqueViolation(detail);
        return ApiError.BadRequest(`Поле "${path}" з інформацією "${value}" вже існує!`);
      }

      case PostgresErrorCode.CheckViolation:
      case PostgresErrorCode.NotNullViolation:
        return ApiError.BadRequest(detail);

      default:
        return error;
    }
  }
}
