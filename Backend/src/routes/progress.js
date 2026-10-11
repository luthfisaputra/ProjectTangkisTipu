import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { tokenLimiter } from '../middleware/rateLimit.js';
import {
  getProgress,
  updateProgress,
  progressTokenParamSchema,
  updateProgressSchema,
} from '../controllers/progressController.js';

const router = Router();

router.get('/:token', tokenLimiter, validate(progressTokenParamSchema, 'params'), getProgress);
router.patch(
  '/:token',
  tokenLimiter,
  validate(progressTokenParamSchema, 'params'),
  validate(updateProgressSchema, 'body'),
  updateProgress,
);

export default router;
