import { Router } from 'express';
import { addWordSchema, deleteWordsSchema, searchWordSchema } from '../controllers/words/validation';
import WordsController from '../controllers/words/WordsController';
import validate from '../middleware/validate';

const router = Router();

router.get('/search/:word(*)', validate(searchWordSchema, { validateParams: true }), WordsController.searchWord);

router.post('/add', validate(addWordSchema), WordsController.addWord);

router.delete('/delete', validate(deleteWordsSchema), WordsController.deleteWords);

export default router;
