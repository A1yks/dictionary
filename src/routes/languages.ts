import { Router } from 'express';
import LanguagesController from '../controllers/languages/LanguagesController';
import { addLanguageSchema, deleteLanguageSchema, editLanguageNameSchema } from '../controllers/languages/validation';
import validate from '../middleware/validate';

const router = Router();

router.get('/', LanguagesController.getLanguages);

router.post('/add', validate(addLanguageSchema), LanguagesController.addLanguage);

router.delete('/delete', validate(deleteLanguageSchema), LanguagesController.deleteLanguage);

router.patch('/edit', validate(editLanguageNameSchema), LanguagesController.editLanguageName);

export default router;
