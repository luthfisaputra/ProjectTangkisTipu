import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { validate } from '../middleware/validate.js';
import {
  getRingkasan,
  getDistribusi,
  getSoalSalah,
  getKategoriSalah,
  getRingkasanKodeKelas,
  statsQuerySchema,
  listQuerySchema,
} from '../controllers/adminStatsController.js';

const router = Router();

// Seluruh endpoint statistik hanya untuk admin (BE-03).
router.use(requireAdmin);

router.get('/stats/ringkasan', validate(statsQuerySchema, 'query'), getRingkasan);
router.get('/stats/distribusi', validate(statsQuerySchema, 'query'), getDistribusi);
router.get('/stats/soal-salah', validate(listQuerySchema, 'query'), getSoalSalah);
router.get('/stats/kategori-salah', validate(listQuerySchema, 'query'), getKategoriSalah);
router.get('/stats/kode-kelas', validate(listQuerySchema, 'query'), getRingkasanKodeKelas);

export default router;
