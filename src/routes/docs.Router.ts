import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const { SCHEME, HOST } = process.env;
const PORT = parseInt(process.env.PORT ?? '', 10) || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth-JWT',
      version: '0.1.0',
      description: 'Auth-JWT',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Oleksandr Myronov',
        mxid: '@o.myronov:dz.biz.ua',
      },
    },
    servers: [
      {
        url: `${SCHEME}://${HOST}:${PORT}`,
      },
    ],
  },
  apis: [
    './build/routes/health.Router.js',
    './build/routes/docs.Router.js',
    './build/routes/auth.Router.js',
    './build/routes/user.Router.js',
  ],
};
const specs = swaggerJsdoc(options);

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *
 *    schemas:
 *      Error:
 *        type: object
 *        required:
 *          - statusCode
 *          - timestamp
 *          - message
 *          - errors
 *        properties:
 *          statusCode:
 *            type: number
 *            description: Error status code
 *            example: 500
 *          timestamp:
 *            type: string
 *            format: date-time
 *            description: Error datetime
 *            example: 2022-09-12T08:02:45.633Z
 *          message:
 *            type: string
 *            description: Error message
 *            example: Some text
 *          errors:
 *            type: array
 *            description: Errors list
 *            items:
 *              type: object
 *              properties:
 *                path:
 *                  type: string
 *                  description: Path error
 *                  example: label
 *                constraints:
 *                  type: object
 *                  additionalProperties:
 *                    type: string
 *                  description: Constraints
 *
 *    responses:
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
