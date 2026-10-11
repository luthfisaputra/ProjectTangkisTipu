import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { validate } from '../middleware/validate.js';
import {
  listSets,
  getSet,
  createSet,
  updateSet,
  publishSet,
  archiveSet,
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createSetSchema,
  updateSetSchema,
  publishSetSchema,
  archiveSetSchema,
  idParamSchema,
  questionParamSchema,
  createQuestionSchema,
  updateQuestionSchema,
} from '../controllers/questionSetsController.js';

const router = Router();

// Seluruh endpoint set soal hanya untuk admin (middleware BE-03).
router.use(requireAdmin);

router.get('/sets', listSets);
router.post('/sets', validate(createSetSchema, 'body'), createSet);
router.get('/sets/:id', validate(idParamSchema, 'params'), getSet);
router.patch('/sets/:id', validate(idParamSchema, 'params'), validate(updateSetSchema, 'body'), updateSet);
router.post('/sets/:id/publish', validate(idParamSchema, 'params'), validate(publishSetSchema, 'body'), publishSet);
router.post('/sets/:id/archive', validate(idParamSchema, 'params'), validate(archiveSetSchema, 'body'), archiveSet);

router.get('/sets/:id/questions', validate(idParamSchema, 'params'), listQuestions);
router.post(
  '/sets/:id/questions',
  validate(idParamSchema, 'params'),
  validate(createQuestionSchema, 'body'),
  createQuestion,
);
router.patch(
  '/sets/:id/questions/:qid',
  validate(questionParamSchema, 'params'),
  validate(updateQuestionSchema, 'body'),
  updateQuestion,
);
router.delete('/sets/:id/questions/:qid', validate(questionParamSchema, 'params'), deleteQuestion);

export default router;
