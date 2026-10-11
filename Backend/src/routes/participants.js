import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { tokenLimiter } from '../middleware/rateLimit.js';
import {
  createParticipant,
  getParticipant,
  createParticipantSchema,
  tokenParamSchema,
} from '../controllers/participantsController.js';

const router = Router();

router.post('/', validate(createParticipantSchema, 'body'), createParticipant);
router.get('/:token', tokenLimiter, validate(tokenParamSchema, 'params'), getParticipant);

export default router;
