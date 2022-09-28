import type { Request, Response, NextFunction } from 'express';

import { UserService } from 'services';
import { SignupDto, UserInfoDto } from 'dtos';
import type { RequestAuth } from 'types/auth';

export default class UserController {
  static async signup(req: Request<undefined, undefined, SignupDto>, res: Response<void>, next: NextFunction) {
    try {
      await UserService.registration(req.body);

      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }

  static async activate(req: Request<{ code: string }>, res: Response<void>, next: NextFunction) {
    try {
      const { code } = req.params;
      await UserService.activate(code);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  static async info(req: RequestAuth, res: Response<UserInfoDto>, next: NextFunction) {
    try {
      const { account } = req.user!;
      const userData = await UserService.getUserInfo(account);

      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}
