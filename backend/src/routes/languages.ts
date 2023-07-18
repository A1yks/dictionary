import { Router } from 'express';
import LanguagesController from '../controllers/languages/LanguagesController';
import { addLanguageSchema, deleteLanguageSchema, editLanguageNameSchema } from '../controllers/languages/validation';
import verifyToken from 'middleware/verifyToken';
import ValidationMiddleware from 'middleware/validation';

const router = Router();

router.get('/', verifyToken, LanguagesController.getLanguages);

router.post('/add', verifyToken, ValidationMiddleware.validate(addLanguageSchema), LanguagesController.addLanguage);

router.delete('/delete', verifyToken, ValidationMiddleware.validate(deleteLanguageSchema), LanguagesController.deleteLanguage);

router.patch('/edit', verifyToken, ValidationMiddleware.validate(editLanguageNameSchema), LanguagesController.editLanguageName);

export default router;
