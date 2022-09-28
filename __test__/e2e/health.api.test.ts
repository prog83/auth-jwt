/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import request from 'supertest';

import { app } from 'main';

describe('GET /health', () => {
  it('should be 404', async () => {
    const { status, body } = await request(app).get('/healthXXX');

    expect(status).toBe(404);
    expect(body).toMatchObject({
      statusCode: 404,
      timestamp: expect.any(String),
      message: expect.any(String),
      errors: expect.any(Array),
    });
  });

  it('should be response', async () => {
    const { status, body } = await request(app).get('/health');

    expect(status).toBe(200);
    expect(body).toEqual({
      uptime: expect.any(Number),
      env: expect.any(String),
      port: expect.any(Number),
    });
  });
});
