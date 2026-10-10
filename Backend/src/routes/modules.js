import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import {
  listModules,
  getModule,
  moduleIdParamSchema,
} from '../controllers/modulesController.js';

const router = Router();

router.get('/', listModules);
router.get('/:id', validate(moduleIdParamSchema, 'params'), getModule);

export default router;
