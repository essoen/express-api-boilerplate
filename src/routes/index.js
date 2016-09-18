import express from 'express';
import raven from 'raven';
import example from './example.routes';
import { pageNotFoundMiddleware, sentryClient, errorMiddleware } from '../components/errors';

const router = express.Router();

router.use('/examples', example);

router.use(pageNotFoundMiddleware);
router.use(raven.middleware.express.errorHandler(sentryClient));
router.use(errorMiddleware);

export default router;
