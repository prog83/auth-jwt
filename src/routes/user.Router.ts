import express from 'express';

import { authMiddleware, validateBodyMiddleware } from 'middlewares';
import { UserController } from 'controllers';
import { SignupDto } from 'dtos';

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      SignupDTO:
 *        type: object
 *        required:
 *          - account
 *          - password
 *          - email
 *          - phone
 *          - mxid
 *        properties:
 *          account:
 *            type: string
 *            description: Login
 *          password:
 *            type: string
 *            format: password
 *            description: Password
 *          email:
 *            type: string
 *            format: email
 *            nullable: true
 *            description: Email
 *          phone:
 *            type: string
 *            nullable: true
 *            description: Phone
 *          mxid:
 *            type: string
 *            nullable: true
 *            description: Matrix id
 *        example:
 *          account: user1
 *          password: passw0rd
 *          email: user@gmail.com
 *          phone: "380501234455"
 *          mxid: user:dz.biz.ua
 *
 *      UserInfoDto:
 *        type: object
 *        required:
 *          - account
 *          - email
 *          - phone
 *          - mxid
 *          - isActivated
 *        properties:
 *          account:
 *            type: string
 *          email:
 *            type: string
 *            nullable: true
 *          phone:
 *            type: string
 *            nullable: true
 *          mxid:
 *            type: string
 *            nullable: true
 *          isActivated:
 *            type: boolean
 *        example:
 *          account: 'user1'
 *          email: 'user1@gmail.com'
 *          phone: '380501234455'
 *          mxid: 'user1:dz.biz.ua'
 *          isActivated: false
 */

/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: API for user
 */

/**
 *  @swagger
 *  /user/signup:
 *    post:
 *      summary: Signup user
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SignupDTO'
 *
 *      responses:
 *        201:
 *          description: Signup user
 *        400:
 *          $ref: '#/components/responses/400'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post('/signup', validateBodyMiddleware(SignupDto), UserController.signup);

/**
 *  @swagger
 *  /user/activate/{code}:
 *    get:
 *      summary: Activate user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: code
 *          schema:
 *            type: string
 *            format: uuid
 *            example: 2fd7c208-1e1e-404d-a2de-6e5185dcdb9f
 *          required: true
 *          description: Activation code
 *
 *      responses:
 *        200:
 *          description: Activated user
 *        404:
 *          $ref: '#/components/responses/404'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get('/activate/:code', UserController.activate);

/**
 *  @swagger
 *  /user/info:
 *    get:
 *      summary: Get info about user
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *
 *      responses:
 *        200:
 *          description: Get info about user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserInfoDto'
 *        401:
 *          $ref: '#/components/responses/401'
 *        404:
 *          $ref: '#/components/responses/404'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get('/info', authMiddleware(), UserController.info);

export default router;
