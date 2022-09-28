import { TokenModel } from 'models';

export type Token = Pick<TokenModel, 'userId' | 'refreshToken' | 'expires'>;
