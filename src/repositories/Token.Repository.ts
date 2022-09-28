import { Raw } from 'typeorm';

import db from 'db';
import { TokenModel } from 'models';
import type { Token } from 'types/token';

const tokenRepository = db.getRepository(TokenModel);

export default class TokenRepository {
  static async createToken(payload: Token) {
    const token = tokenRepository.create(payload);
    return tokenRepository.save(token);
  }

  static async updateToken(token: TokenModel, payload: Pick<Token, 'refreshToken' | 'expires'>) {
    tokenRepository.merge(token, payload);
    return tokenRepository.save(token);
  }

  static async deleteTokenByToken(refreshToken: string) {
    return tokenRepository.delete({ refreshToken });
  }

  static async deleteTokenByUser(userId: number) {
    return tokenRepository.delete({ userId });
  }

  static async getTokenByToken(token: string) {
    return tokenRepository.findOne({
      where: {
        refreshToken: token,
      },
      relations: {
        user: true,
      },
    });
  }

  static async getTokenByUser(userId: number) {
    return tokenRepository.findOneBy({ userId });
  }

  static async getActiveTokens() {
    return tokenRepository.find({
      where: {
        expires: Raw((alias) => `${alias} >= NOW()`),
      },
      relations: {
        user: true,
      },
    });
  }
}
