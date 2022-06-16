import { Router } from 'express';
import LanguagesController from '../controllers/languages/LanguagesController';
import { addLanguageSchema, deleteLanguageSchema, editLanguageNameSchema } from '../controllers/languages/validation';
import validate from '../middleware/validate';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.get('/', verifyToken, LanguagesController.getLanguages);

router.post('/add', [verifyToken, validate(addLanguageSchema)], LanguagesController.addLanguage);

router.delete('/delete', [verifyToken, validate(deleteLanguageSchema)], LanguagesController.deleteLanguage);

router.patch('/edit', [verifyToken, validate(editLanguageNameSchema)], LanguagesController.editLanguageName);

export default router;
