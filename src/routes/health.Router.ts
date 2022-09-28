import express, { type Response } from 'express';

interface Health {
  uptime: number;
  env: string;
  port: number;
}

const router = express.Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      HealthDto:
 *        type: object
 *        required:
 *          - uptime
 *          - env
 *          - port
 *        properties:
 *          uptime:
 *            type: number
 *            description: Uptime
 *            example: 39.488604875
 *          env:
 *            type: string
 *            description: Environment
 *            example: development
 *          port:
 *            type: number
 *            description: Port
 *            example: 3000
 */

/**
 *  @swagger
 *  tags:
 *    name: Health
 *    description: API for health service
 */

/**
 *  @swagger
 *  /health:
 *    get:
 *      summary: Get health service
 *      tags: [Health]
 *      security:
 *        - bearerAuth: []
 *
 *      responses:
 *        200:
 *          description: Get health service
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HealthDto'
 */

const PORT = parseInt(process.env.PORT ?? '', 10) || 3000;

router.get('/', (req, res: Response<Health>) => {
  res.json({
    uptime: process.uptime(),
    env: process.env.NODE_ENV || 'unset',
    port: PORT,
  });
});

export default router;
