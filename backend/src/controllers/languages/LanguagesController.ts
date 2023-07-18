import { errorsHandler } from 'utils/errorsHandler';
import LanguagesService from '../../services/languages/LanguagesService';
import { isServiceError } from '../../types/guards';
import { AddLanguageReq, DeleteLanguageReq, EditLanguageNameReq } from './types';
import { ErrorTypes } from 'enums/errors';

class LanguagesController {
    async getLanguages(req: Server.Request, res: Server.Response) {
        try {
            const userId = req.userId!;
            const result = await LanguagesService.getLanguages(userId);

            res.status(200).json({ data: result });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'Произошла ошибка при попытке получить словари пользователя',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    async addLanguage(req: Server.Request<AddLanguageReq>, res: Server.Response) {
        const userId = req.userId!;
        const { langName } = req.body;

        try {
            const language = await LanguagesService.addLanguage(userId, langName);

            res.status(201).json({ data: language });
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при добавлении нового языка' });
        }
    }

    async deleteLanguage(req: Server.Request<DeleteLanguageReq>, res: Server.Response) {
        const { dictId } = req.body;

        try {
            const result = await LanguagesService.deleteLanguage(dictId);

            if (isServiceError(result)) {
                return res.status(result.status).json({ error: result.error });
            }

            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при удалении языка' });
        }
    }

    async editLanguageName(req: Server.Request<EditLanguageNameReq>, res: Server.Response) {
        const { dictId, langName } = req.body;

        try {
            const result = await LanguagesService.editLanguageName(dictId, langName);

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
