import WordsService from '../../services/words/WordsService';
import { isServiceError } from '../../types/guards';
import { AddWordReq, DeleteWordsReq, SearchWordParams } from './types';

class WordsController {
    async searchWord(req: Server.Request<SearchWordParams>, res: Server.Response) {
        const { word } = req.body;

        try {
            const result = await WordsService.searchWord(word);

            if (isServiceError(result)) {
                return res.status(result.status).json({ error: result.error });
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
}

export default new WordsController();
