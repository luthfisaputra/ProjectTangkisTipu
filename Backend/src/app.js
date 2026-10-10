import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import { globalLimiter } from './middleware/rateLimit.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import participantsRouter from './routes/participants.js';
import classCodesRouter from './routes/classCodes.js';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(globalLimiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/participants', participantsRouter);
app.use('/api/class-codes', classCodesRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
