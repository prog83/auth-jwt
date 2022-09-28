import express from 'express';

import { AuthController } from 'controllers';
import { validateBodyMiddleware, authMiddleware } from 'middlewares';
import { SigninDto } from 'dtos';
import { Permissions } from 'helpers';

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      SigninDto:
 *        type: object
 *        required:
 *          - account
 *          - password
 *        properties:
 *          account:
 *            type: string
 *            description: Login
 *          password:
 *            type: string
 *            description: Password
 *        example:
 *          account: user1
 *          password: passw0rd
 *
 *      TokenResponse:
 *        type: object
 *        required:
 *          - accessToken
 *        properties:
 *          accessToken:
 *            type: string
 *            description: Access token
 *        example:
 *          accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjI1ODAyYzExMWVkMTRiYTkyMTIyYiIsImFjY291bnQiOiJ0ZXN0MSIsImVtYWlsIjoiZW1haWwxQG1haWwuY29tIiwiaWF0IjoxNjYwMDU0NzMyLCJleHAiOjE2NjAwNTQ3OTJ9.07xiabgger9UL_x78Z-l2iocnSxhqjktxMzLuUAkHUs
 *
 *    parameters:
 *      refreshToken:
 *        in: cookie
 *        name: refreshToken
 *        schema:
 *          type: string
 *        description: Refresh token
 */

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: API for auth
 */

/**
 *  @swagger
 *  /auth/signin:
 *    post:
 *      summary: Signin user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/SigninDto'
 *
 *      responses:
 *        200:
 *          description: Signin user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TokenResponse'
 *        400:
 *          $ref: '#/components/responses/400'
 *        404:
 *          $ref: '#/components/responses/404'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post('/signin', validateBodyMiddleware(SigninDto), AuthController.signin);

/**
 *  @swagger
 *  /auth/logout:
 *    post:
 *      summary: Logout user
 *      tags: [Auth]
 *      parameters:
 *        - $ref: '#/components/parameters/refreshToken'
 *
 *      responses:
 *        200:
 *          description: Logout user
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post('/logout', AuthController.logout);

/**
 *  @swagger
 *  /auth/refresh:
 *    get:
 *      summary: Activate user
 *      tags: [Auth]
 *      parameters:
 *        - $ref: '#/components/parameters/refreshToken'
 *
 *      responses:
 *        200:
 *          description: Refresh token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TokenResponse'
 *        401:
 *          $ref: '#/components/responses/401'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get('/refresh', AuthController.refresh);

// TODO admin
router.get('/sessions', authMiddleware([Permissions.DICT]), AuthController.sessions);

router.delete('/sessions/:account', authMiddleware([Permissions.ADMIN]), AuthController.deleteSession);

export default router;
