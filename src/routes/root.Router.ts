import express from 'express';

import healthRouter from './health.Router';
import docsRouter from './docs.Router';
import authRouter from './auth.Router';
import userRouter from './user.Router';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/docs', docsRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
