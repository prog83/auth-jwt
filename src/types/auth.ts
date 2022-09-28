import type { Request } from 'express';

import { TokenPayloadDto } from 'dtos';

export interface TokenResponse {
  accessToken: string;
}

export interface RequestAuth<P = unknown, R = unknown, B = unknown, Q = unknown> extends Request<P, R, B, Q> {
  user?: TokenPayloadDto;
}
