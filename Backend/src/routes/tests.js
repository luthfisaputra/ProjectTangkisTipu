import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import {
  startTest,
  submitTest,
  getResults,
  testTypeParamSchema,
  startTestSchema,
  submitTestSchema,
  resultsTokenParamSchema,
} from '../controllers/testsController.js';

const router = Router();

router.post(
  '/:type/start',
  validate(testTypeParamSchema, 'params'),
  validate(startTestSchema, 'body'),
  startTest,
);

router.post(
  '/:type/submit',
  validate(testTypeParamSchema, 'params'),
  validate(submitTestSchema, 'body'),
  submitTest,
);

router.get('/:token/results', validate(resultsTokenParamSchema, 'params'), getResults);

export default router;
