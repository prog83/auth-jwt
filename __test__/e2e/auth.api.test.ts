/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import request from 'supertest';
import crypto from 'crypto';

import 'env';
import { app } from 'main';
import db from 'db';
import { UserRepository, ActivationCodeRepository, TokenRepository } from 'repositories';
import { SignupDto } from 'dtos';

import { ERROR_BODY_BAD_REQUEST, ERROR_BODY_NOT_FOUND } from './errors';

const baseRoute = '/auth';

const signup: SignupDto = {
  account: crypto.randomUUID().slice(1, 32),
  password: 'test123',
  lastName: 'Іванов',
  firstName: 'Іван',
  middleName: null,
  birthday: new Date(),
  email: null,
  phone: null,
  mxid: null,
};

const user = {
  account: signup.account,
  password: signup.password,
};

const createDataDB = () => request(app).post('/user/signup').send(signup);

const removeDataDB = async () => {
  const candidate = await UserRepository.getUserByAccount(signup.account);
  if (!candidate) {
    return;
  }

  const { id } = candidate;
  await TokenRepository.deleteTokenByUser(id);
  await ActivationCodeRepository.deleteCodeByUser(id);
  await UserRepository.deleteUser(id);
};

beforeAll(async () => {
  await db.initialize();
  await createDataDB();
});

afterAll(async () => {
  await removeDataDB();
  await db.destroy();
});

const hasRefreshToken = (cookies: Array<string>) =>
  cookies.some((cookie) => cookie.search(/^refreshToken=[^;]/) !== -1);

describe(`POST ${baseRoute}/signin`, () => {
  const { account, password } = user;

  describe('check require data', () => {
    it('shouldn`t signin with not require account', async () => {
      const { status, body } = await request(app).post(`${baseRoute}/signin`).send({ password });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t signin with not require password', async () => {
      const { status, body } = await request(app).post(`${baseRoute}/signin`).send({ account }).expect(400);

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  describe('check validate data', () => {
    it('shouldn`t signin with not no valid account', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signin`)
        .send({ ...user, account: 'se' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t signin with not no valid password', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signin`)
        .send({ ...user, password: '123' })
        .expect(400);

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  it('shouldn`t signin not found account', async () => {
    const { status, body } = await request(app)
      .post(`${baseRoute}/signin`)
      .send({ ...user, account: account.slice(0, -1) });

    expect(status).toBe(404);
    expect(body).toMatchObject(ERROR_BODY_NOT_FOUND);
  });

  it('should signin', async () => {
    const response = await request(app).post(`${baseRoute}/signin`).send(user);
    expect(response.status).toBe(200);
    // expect(response.body.accessToken).toBeDefined();
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
    expect(hasRefreshToken(response.get('Set-Cookie'))).toBe(true);
  });

  it('shouldn`t signin wrong password', async () => {
    const { status, body } = await request(app)
      .post(`${baseRoute}/signin`)
      .send({ ...user, password: crypto.randomUUID() });

    expect(status).toBe(400);
    expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
  });
});

describe(`GET ${baseRoute}/logout`, () => {
  it('should be logout', async () => {
    const response = await request(app).post(`${baseRoute}/logout`);

    expect(response.status).toBe(204);
    expect(hasRefreshToken(response.get('Set-Cookie'))).toBe(false);
  });
});

describe(`GET ${baseRoute}/refresh`, () => {
  it('should be refresh', async () => {
    const resSignin = await request(app).post(`${baseRoute}/signin`).send(user).expect(200);

    const resRefresh = await request(app)
      .get(`${baseRoute}/refresh`)
      .set('Cookie', resSignin.get('Set-Cookie'))
      .expect(200);

    expect(resRefresh.body).toEqual({
      accessToken: expect.any(String),
    });
    expect(hasRefreshToken(resRefresh.get('Set-Cookie'))).toBe(true);
  });
});
