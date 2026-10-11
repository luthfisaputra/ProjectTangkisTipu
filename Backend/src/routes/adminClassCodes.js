import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { validate } from '../middleware/validate.js';
import {
  listClassCodes,
  getClassCode,
  createClassCode,
  updateClassCode,
  deactivateClassCode,
  activateClassCode,
  createClassCodeSchema,
  updateClassCodeSchema,
  codeParamSchema,
  listClassCodesQuerySchema,
} from '../controllers/classCodesController.js';

const router = Router();

// Seluruh endpoint manajemen kode kelas hanya untuk admin (BE-03).
router.use(requireAdmin);

router.get('/class-codes', validate(listClassCodesQuerySchema, 'query'), listClassCodes);
router.post('/class-codes', validate(createClassCodeSchema, 'body'), createClassCode);
router.get('/class-codes/:code', validate(codeParamSchema, 'params'), getClassCode);
router.patch(
  '/class-codes/:code',
  validate(codeParamSchema, 'params'),
  validate(updateClassCodeSchema, 'body'),
  updateClassCode,
);
router.post('/class-codes/:code/deactivate', validate(codeParamSchema, 'params'), deactivateClassCode);
router.post('/class-codes/:code/activate', validate(codeParamSchema, 'params'), activateClassCode);

export default router;
