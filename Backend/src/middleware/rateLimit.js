import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

const handler = (req, res) => {
  res.status(429).json({
    error: {
      code: 'RATE_LIMITED',
      message: 'Terlalu banyak permintaan, coba lagi nanti.',
    },
  });
};

export const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

export const tokenLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: Math.max(5, Math.floor(env.RATE_LIMIT_MAX / 5)),
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

export default globalLimiter;
