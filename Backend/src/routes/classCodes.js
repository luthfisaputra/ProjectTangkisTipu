import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import {
  validateClassCode,
  validateClassCodeSchema,
} from '../controllers/classCodesController.js';

const router = Router();

router.post('/validate', validate(validateClassCodeSchema, 'body'), validateClassCode);

export default router;
