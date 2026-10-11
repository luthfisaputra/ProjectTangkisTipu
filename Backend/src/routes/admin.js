import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { me } from '../controllers/adminAuthController.js';

const router = Router();

// Seluruh route di bawah ini dilindungi autentikasi admin.
router.use(requireAdmin);

router.get('/me', me);

export default router;
