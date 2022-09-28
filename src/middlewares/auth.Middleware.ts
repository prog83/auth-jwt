import type { Request, Response, NextFunction } from 'express';

import { TokenService } from 'services';
import { ApiError } from 'exceptions';
import type { RequestAuth } from 'types/auth';
import type { MultiDictionary } from 'types/common';

export const authorize = (permissions: MultiDictionary, allowed: Array<number> = []) =>
  allowed.some((id) => permissions.findIndex((permission) => permission.id === id) !== -1);

const authentication =
  (allowedPermissions: Array<number> = []) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw ApiError.UnauthorizedError();
      }

      const [, token] = authorization.split(' ');
      if (!token) {
        throw ApiError.UnauthorizedError();
      }

      const userData = TokenService.validateAccessToken(token);
      if (!userData) {
        throw ApiError.UnauthorizedError();
      }

      const { permissions } = userData;
      const isAuthorized = authorize(permissions, allowedPermissions);
      if (!isAuthorized) {
        throw ApiError.ForbiddenError();
      }

      (req as RequestAuth).user = userData;

      next();
    } catch (error) {
      next(error);
    }
  };

export default authentication;
