import { Router } from 'express';
import {
    addWordSchema,
    deleteWordsSchema,
    getWordsSchema,
    learnWordSchema,
    searchWordsSchema,
    translateWordSchema,
} from '../controllers/words/validation';
import WordsController from '../controllers/words/WordsController';
import verifyToken from '../middleware/verifyToken';
import ValidationMiddleware from 'middleware/validation';

const router = Router();

router.get(
    '/translate/:word(*)',
    verifyToken,
    ValidationMiddleware.validate(translateWordSchema, { validateParams: true }),
    WordsController.translateWord
);

router.get('/', verifyToken, ValidationMiddleware.validate(getWordsSchema, { validateQuery: true }), WordsController.getWords);

router.get('/learn', verifyToken, ValidationMiddleware.validate(getWordsSchema, { validateQuery: true }), WordsController.getWordsToLearn);

router.post('/add', verifyToken, ValidationMiddleware.validate(addWordSchema), WordsController.addWord);

router.delete('/delete', verifyToken, ValidationMiddleware.validate(deleteWordsSchema), WordsController.deleteWords);

router.patch('/learn', verifyToken, ValidationMiddleware.validate(learnWordSchema), WordsController.learnWord);

router.get('/search', verifyToken, ValidationMiddleware.validate(searchWordsSchema, { validateQuery: true }), WordsController.searchWords);

export default router;
