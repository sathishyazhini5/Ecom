import express from 'express';
import { authRouter } from './auth.js';
import { usersRouter } from './usersRoute.js';
import { orgTypeRouter } from './orgTypeRoute.js';
import { orgRouter } from './orgRoute.js';
import { productRouter } from './productroute.js';

const router = express.Router();
router.use(authRouter);
router.use(usersRouter);
router.use(orgTypeRouter);
router.use(orgRouter);
router.use(productRouter)

export const indexRouter = router;