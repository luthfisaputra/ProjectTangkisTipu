import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { tokenLimiter } from '../middleware/rateLimit.js';
import { login, loginSchema } from '../controllers/adminAuthController.js';

const router = Router();

router.post('/login', tokenLimiter, validate(loginSchema, 'body'), login);

export default router;
