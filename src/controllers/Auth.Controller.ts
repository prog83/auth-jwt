import type { Request, Response, NextFunction } from 'express';

import { AuthService } from 'services';
import { SigninDto, UserInfoDto } from 'dtos';
import type { TokenResponse, RequestAuth } from 'types/auth';

export default class AuthController {
  static async signin(req: Request<undefined, undefined, SigninDto>, res: Response<TokenResponse>, next: NextFunction) {
    try {
      const { refreshToken, ...rest } = await AuthService.signin(req.body);

      res.cookie('refreshToken', refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });

      res.json(rest);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response<void>, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await AuthService.logout(refreshToken);
      res.clearCookie('refreshToken');

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req: Request, res: Response<TokenResponse>, next: NextFunction) {
    try {
      const { refreshToken: token } = req.cookies;
      const { refreshToken, ...rest } = await AuthService.refresh(token);

      const jwtRefreshExpires = parseInt(process.env.JWT_REFRESH_EXPIRES!, 10);
      res.cookie('refreshToken', refreshToken, {
        // domain: 'develop.portal.smartdisys.com',
        maxAge: jwtRefreshExpires * 1000,
        httpOnly: true,
      });

      res.json(rest);
    } catch (error) {
      next(error);
    }
  }

  static async sessions(req: RequestAuth, res: Response<Array<UserInfoDto>>, next: NextFunction) {
    try {
      const usersData = await AuthService.activeSessions();

      res.json(usersData);
    } catch (error) {
      next(error);
    }
  }

  static async deleteSession(req: RequestAuth<{ account: string }>, res: Response<void>, next: NextFunction) {
    try {
      const { account } = req.params;
      await AuthService.deleteSession(account);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
