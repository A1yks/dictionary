import LanguagesService from '../../services/languages/LanguagesService';
import { isServiceError } from '../../types/guards';
import { AddLanguageReq, DeleteLanguageReq, EditLanguageNameReq } from './types';

class LanguagesController {
    async getLanguages(req: Server.Request, res: Server.Response) {
        const languages = await LanguagesService.getLanguages();

        res.status(200).json({ data: languages });
    }

    async addLanguage(req: Server.Request<AddLanguageReq>, res: Server.Response) {
        const { langName } = req.body;

        try {
            const language = await LanguagesService.addLanguage(langName);

            res.status(201).json({ data: language });
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при добавлении нового языка' });
        }
    }

    async deleteLanguage(req: Server.Request<DeleteLanguageReq>, res: Server.Response) {
        const { langId } = req.body;

        try {
            const result = await LanguagesService.deleteLanguage(langId);

            if (isServiceError(result)) {
                return res.status(result.status).json({ error: result.error });
            }

            res.status(204).send();
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Произошла ошибка при удалении языка' });
        }
    }

    async editLanguageName(req: Server.Request<EditLanguageNameReq>, res: Server.Response) {
        const { langId, langName } = req.body;

        try {
            const result = await LanguagesService.editLanguageName(langId, langName);

            if (isServiceError(result)) {
                return res.status(result.status).json({ error: result.error });
            }

            res.status(200).json({ data: result });
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при изменении названия языка' });
        }
    }
}

export default new LanguagesController();
