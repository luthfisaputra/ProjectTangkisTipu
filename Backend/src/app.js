import express from 'express';
import { env } from './config/env.js';
import { corsMiddleware } from './middleware/cors.js';
import { globalLimiter } from './middleware/rateLimit.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import participantsRouter from './routes/participants.js';
import classCodesRouter from './routes/classCodes.js';
import modulesRouter from './routes/modules.js';
import progressRouter from './routes/progress.js';
import testsRouter from './routes/tests.js';

const app = express();

if (env.TRUST_PROXY > 0) {
  app.set('trust proxy', env.TRUST_PROXY);
}

app.use(corsMiddleware);
app.use(express.json());
app.use(globalLimiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/participants', participantsRouter);
app.use('/api/class-codes', classCodesRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/progress', progressRouter);
app.use('/api/tests', testsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
