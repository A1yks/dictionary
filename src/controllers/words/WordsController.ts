import WordsService from '../../services/words/WordsService';
import { isServiceError } from '../../types/guards';
import handleServiceResult from '../../utils/handleServiceResult';
import { AddWordReq, DeleteWordsReq, LearnWordReq, TranslateWordParams, TranslateWordQueryPamars } from './types';

class WordsController {
    async translateWord(req: Server.Request<unknown, TranslateWordParams, TranslateWordQueryPamars>, res: Server.Response) {
        const { word } = req.params;
        const { langId } = req.query;

        try {
            let result: Awaited<ReturnType<typeof WordsService['translateWord']>>;
            let isWordAdded = undefined;

            if (langId !== undefined) {
                const [translationResult, wordAdded] = await Promise.all([WordsService.translateWord(word), WordsService.isWordAdded(langId, word)]);

                result = translationResult;
                isWordAdded = wordAdded;
            } else {
                result = await WordsService.translateWord(word);
            }

            if (isServiceError(result)) {
                return res.status(result.status).json({ error: result.error });
            }

            if (isWordAdded !== undefined) {
                result.isWordAdded = isWordAdded;
            }

            res.status(200).json({ data: result });
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при поиске слова' });
        }
    }

    async addWord(req: Server.Request<AddWordReq>, res: Server.Response) {
        const { langId, word } = req.body;

        try {
            const result = await WordsService.addWord(langId, word);

            if (isServiceError(result)) {
                return res.status(result.status).json({ error: result.error });
            }

            res.status(201).json({ data: result });
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при добавлении нового слова' });
        }
    }

    async deleteWords(req: Server.Request<DeleteWordsReq>, res: Server.Response) {
        const { langId, words } = req.body;

        try {
            const result = await WordsService.deleteWords(langId, words);

            if (isServiceError(result)) {
                return res.status(result.status).json({ error: result.error });
            }

            res.status(200).json({ data: result });
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при попытке удалить слово' });
        }
    }

    async learnWord(req: Server.Request<LearnWordReq>, res: Server.Response) {
        const { wordId, feedback } = req.body;

        try {
            const result = await WordsService.learnWord(wordId, feedback);

            handleServiceResult(result, res);
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при попытке выучить слово' });
        }
    }
}

export default new WordsController();
