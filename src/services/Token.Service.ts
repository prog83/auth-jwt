import jwt from 'jsonwebtoken';

import { TokenPayloadDto } from 'dtos';
import { TokenRepository } from 'repositories';
import type { Token } from 'types/token';

export default class TokenService {
  static generateTokens(payload: TokenPayloadDto) {
    const jwtAccessExpires = parseInt(process.env.JWT_ACCESS_EXPIRES!, 10);
    const jwtRefreshExpires = parseInt(process.env.JWT_REFRESH_EXPIRES!, 10);

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: jwtAccessExpires,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: jwtRefreshExpires,
    });
    const refreshTokenExpires = new Date(Date.now() + jwtRefreshExpires * 1000);

    return { accessToken, refreshToken, expires: refreshTokenExpires };
  }

  static async saveRefreshToken(payload: Token) {
    const { userId, refreshToken, expires } = payload;
    const tokenData = await TokenRepository.getTokenByUser(userId);
    if (tokenData) {
      await TokenRepository.updateToken(tokenData, { refreshToken, expires });
      return;
    }

    await TokenRepository.createToken(payload);
  }

  static async removeRefreshToken(refreshToken: string) {
    await TokenRepository.deleteTokenByToken(refreshToken);
  }

  static async findToken(refreshToken: string) {
    const tokenData = await TokenRepository.getTokenByToken(refreshToken);
    return tokenData;
  }

  static validateAccessToken(token: string) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

      return tokenData as TokenPayloadDto;
    } catch (error) {
      return null;
    }
  }

  static validateRefreshToken(token: string) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

      return tokenData as TokenPayloadDto;
    } catch (error) {
      return null;
    }
  }
}
