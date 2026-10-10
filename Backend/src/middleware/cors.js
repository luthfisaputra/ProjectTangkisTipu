import cors from 'cors';
import { env } from '../config/env.js';

const origins = env.CORS_ORIGIN.split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const allowAll = origins.includes('*');

export const corsMiddleware = cors({
  origin: allowAll
    ? true
    : (origin, callback) => {
        if (!origin || origins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error('Origin tidak diizinkan oleh CORS'));
      },
  credentials: true,
});

export default corsMiddleware;
