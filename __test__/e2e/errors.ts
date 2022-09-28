const ERROR_BODY_BASE = {
  timestamp: expect.any(String),
  message: expect.any(String),
  errors: expect.any(Array),
};

export const ERROR_BODY_BAD_REQUEST = {
  ...ERROR_BODY_BASE,
  statusCode: 400,
};

export const ERROR_BODY_UNAUTHORIZED = {
  ...ERROR_BODY_BASE,
  statusCode: 401,
};

export const ERROR_BODY_NOT_FOUND = {
  ...ERROR_BODY_BASE,
  statusCode: 404,
};

export const ERROR_BODY_INTERNAL_SERVER_ERROR = {
  ...ERROR_BODY_BASE,
  statusCode: 500,
};
