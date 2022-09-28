import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';

import { MailService } from 'services';
import { UserRepository, ActivationCodeRepository } from 'repositories';
import { SignupDto, UserInfoDto } from 'dtos';
import { ApiError, PostgresError } from 'exceptions';

export default class UserService {
  static async registration(data: SignupDto) {
    const { account, password, email } = data;

    const candidate = await UserRepository.getUserByAccount(account);
    if (candidate) {
      throw ApiError.BadRequest(`Користувач ${account} вже існує!`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    try {
      const user = await UserRepository.createUser({ ...data, password: hashPassword });

      if (email) {
        const code = crypto.randomUUID();
        await MailService.sendActivationMail(email, code);
        await ActivationCodeRepository.createCode({ userId: user.id, code });
      }
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.log(error);

        throw PostgresError.getInstance(error);
      }

      throw error;
    }
  }

  static async activate(code: string) {}

  static async getUserInfo(account: string) {
    const candidate = await UserRepository.getUserByAccount(account);
    if (!candidate) {
      throw ApiError.BadRequest(`Користувач ${account} не існує!`);
    }

    const userData = new UserInfoDto(candidate);

    return userData;
  }
}
