import { Router } from 'express';
import { addWordSchema, deleteWordsSchema, searchWordSchema } from '../controllers/words/validation';
import WordsController from '../controllers/words/WordsController';
import validate from '../middleware/validate';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.get('/translate/:word(*)', [verifyToken, validate(searchWordSchema, { validateParams: true })], WordsController.translateWord);

router.post('/add', [verifyToken, validate(addWordSchema)], WordsController.addWord);

router.delete('/delete', [verifyToken, validate(deleteWordsSchema)], WordsController.deleteWords);

export default router;
