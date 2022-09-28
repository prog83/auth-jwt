/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import request from 'supertest';
import crypto from 'crypto';

import 'env';
import { app } from 'main';
import db from 'db';
import { UserRepository, ActivationCodeRepository, TokenRepository } from 'repositories';
import { SignupDto } from 'dtos';

import { ERROR_BODY_BAD_REQUEST, ERROR_BODY_UNAUTHORIZED } from './errors';

const baseRoute = '/user';

const signup: SignupDto = {
  account: crypto.randomUUID().slice(1, 32),
  password: 'test123',
  lastName: 'Іванов',
  firstName: 'Іван',
  middleName: 'Іванованович',
  birthday: new Date(),
  email: `${crypto.randomUUID()}@test.com`,
  phone: '380999999999',
  mxid: '@test:dz.biz.ua',
};

const user = {
  account: signup.account,
  password: signup.password,
};

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
});

afterAll(async () => {
  await removeDataDB();
  await db.destroy();
});

describe(`POST ${baseRoute}/signup`, () => {
  const { account } = signup;

  describe('check require data', () => {
    it('shouldn`t create account with not require account', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, account: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create account with not require password', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, password: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create account with not require lastName', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, lastName: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create account with not require firstName', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, firstName: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create account with not require middleName', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, middleName: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create account with not require birthday', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, birthday: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create account with not require email', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, email: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create account with not require phone', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, phone: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create account with not require mxid', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, mxid: undefined });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  describe('check validate data', () => {
    it('shouldn`t create accoun with no valid account', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, account: 123 });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create accoun with no valid password', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, password: '123' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create accoun with no valid lastName', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, lastName: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create accoun with no valid firstName', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, firstName: 'Se' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create accoun with no valid middleName', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, middleName: '' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create accoun with no valid birthday', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, birthday: 'test' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create accoun with no valid email', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, email: 'test' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create accoun with no valid phone', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, phone: '0501234455' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });

    it('shouldn`t create accoun with no valid mxid', async () => {
      const { status, body } = await request(app)
        .post(`${baseRoute}/signup`)
        .send({ ...signup, mxid: 'test' });

      expect(status).toBe(400);
      expect(body).toMatchObject(ERROR_BODY_BAD_REQUEST);
    });
  });

  it('should create account', async () => request(app).post(`${baseRoute}/signup`).send(signup).expect(201));

  it('shouldn`t create account with same account name', async () => {
    const { status, body } = await request(app).post(`${baseRoute}/signup`).send(signup);

    expect(status).toBe(400);
    expect(body).toEqual(ERROR_BODY_BAD_REQUEST);
  });

  it('shouldn`t create account with same email', async () => {
    const { status, body } = await request(app)
      .post(`${baseRoute}/signup`)
      .send({
        ...signup,
        account: account.slice(0, -1),
        // email: 'test@test.com',
        phone: '380999999993',
        mxid: '@test1:dz.biz.ua',
      });

    expect(status).toBe(400);
    expect(body).toEqual(ERROR_BODY_BAD_REQUEST);
  });

  it('shouldn`t create account with same phone', async () => {
    const { status, body } = await request(app)
      .post(`${baseRoute}/signup`)
      .send({
        ...signup,
        account: account.slice(0, -1),
        email: 'test@test.com',
        // phone: '380999999993',
        mxid: '@test1:dz.biz.ua',
      });

    expect(status).toBe(400);
    expect(body).toEqual(ERROR_BODY_BAD_REQUEST);
  });

  it('shouldn`t create account with same mxid', async () => {
    const { status, body } = await request(app)
      .post(`${baseRoute}/signup`)
      .send({
        ...signup,
        account: account.slice(0, -1),
        email: 'test@test.com',
        phone: '380999999993',
        // mxid: '@test1:dz.biz.ua',
      });

    expect(status).toBe(400);
    expect(body).toEqual(ERROR_BODY_BAD_REQUEST);
  });
});

describe(`GET ${baseRoute}/activate/:code`, () => {
  it('should activate', () => request(app).get(`${baseRoute}/activate/some-code`).expect(204));
});

describe(`GET ${baseRoute}/info`, () => {
  it('should be unauthorized', async () => {
    const { status, body } = await request(app).get(`${baseRoute}/info`);

    expect(status).toBe(401);
    expect(body).toEqual(ERROR_BODY_UNAUTHORIZED);
  });

  it('should get info about user', async () => {
    const resSignin = await request(app).post('/auth/signin').send(user).expect(200);

    const { accessToken } = resSignin.body;

    const response = await request(app).get(`${baseRoute}/info`).set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      account: signup.account,
      email: signup.email,
      phone: signup.phone,
      mxid: signup.mxid,
      isActivated: expect.any(Boolean),
    });
  });
});
