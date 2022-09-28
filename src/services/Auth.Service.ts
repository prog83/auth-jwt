// import bcrypt from 'bcrypt';

import { LdapService, TokenService } from 'services';
import { UserRepository, LdapRepository, TokenRepository } from 'repositories';
import { SigninDto, TokenPayloadDto, UserInfoDto } from 'dtos';
import { ApiError } from 'exceptions';
import { Permissions } from 'helpers';

export default class AuthService {
  static async signin(data: SigninDto) {
    const { account, password } = data;

    // TODO is activated, non blocking and with auth permition
    const [candidate, candidateLdap] = await Promise.all([
      UserRepository.getUserByAccount(account),
      LdapRepository.searchUserByUid(account),
    ]);
    if (!candidate || !candidateLdap) {
      throw ApiError.NotFoundError(`Користувача ${account} не знайдено!`);
    }

    if (candidate.blockedAt) {
      throw ApiError.BadRequest(`Користувач заблокований!`);
    }

    // if (!candidate.isActivated) {
    //   throw ApiError.BadRequest(`Користувач не активований!`);
    // }

    // const isPasswordEqual = await bcrypt.compare(password, candidate.password);
    // if (!isPasswordEqual) {
    //   throw ApiError.BadRequest(`Невірний пароль!`);
    // }

    const isLdapAuth = await LdapRepository.authenticate(account, password);
    if (!isLdapAuth) {
      throw ApiError.BadRequest(`Невірний пароль!`);
    }

    const roles = await LdapService.getGroups(candidateLdap);
    const isAuthorized = roles.findIndex(({ id }) => id === Permissions.AUTH) !== -1;
    if (!isAuthorized) {
      throw ApiError.ForbiddenError();
    }

    const userData = new TokenPayloadDto(candidate, roles);
    const { accessToken, refreshToken, expires } = TokenService.generateTokens({ ...userData });
    await TokenService.saveRefreshToken({ userId: userData.id, refreshToken, expires });

    return { accessToken, refreshToken };
  }

  static async logout(refreshToken: string) {
    await TokenService.removeRefreshToken(refreshToken);
  }

  static async refresh(token?: string) {
    if (!token) {
      throw ApiError.UnauthorizedError();
    }

    const tokenData = TokenService.validateRefreshToken(token);
    const findToken = await TokenService.findToken(token);
    if (!tokenData || !findToken) {
      throw ApiError.UnauthorizedError();
    }

    if (!findToken.user) {
      throw ApiError.BadRequest(`Користувач id = ${tokenData.id} не існує!`);
    }

    const userData = new TokenPayloadDto(findToken.user);
    const { accessToken, refreshToken, expires } = TokenService.generateTokens({ ...userData });
    await TokenService.saveRefreshToken({ userId: userData.id, refreshToken, expires });

    return { accessToken, refreshToken };
  }

  static async activeSessions() {
    const tokens = await TokenRepository.getActiveTokens();
    const usersData = tokens.map(({ user }) => new UserInfoDto(user));

    return usersData;
  }

  static async deleteSession(account: string) {
    const candidate = await UserRepository.getUserByAccount(account);
    if (!candidate) {
      throw ApiError.BadRequest(`Користувач ${account} не існує!`);
    }

    await TokenRepository.deleteTokenByUser(candidate.id);
  }
}
