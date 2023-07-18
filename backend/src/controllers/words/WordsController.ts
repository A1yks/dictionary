import { handleServerErrors } from 'utils/errorsHandler';
import WordsService from '../../services/words/WordsService';
import { AddWordReq, DeleteWordsReq, GetWordsReq, LearnWordReq, SearchWordsReq, TranslateWordParams, TranslateWordQueryPamars } from './types';

namespace WordsController {
    export const translateWord = handleServerErrors<void, TranslateWordParams, TranslateWordQueryPamars>(
        async (req, res) => {
            const { word } = req.params;
            const { dictId } = req.query;

            let result: Awaited<ReturnType<(typeof WordsService)['translateWord']>>;
            let isWordAdded = undefined;

            if (dictId !== undefined) {
                const [translationResult, wordAdded] = await Promise.all([WordsService.translateWord(word), WordsService.isWordAdded(dictId, word)]);

                result = translationResult;
                isWordAdded = wordAdded;
            } else {
                result = await WordsService.translateWord(word);
            }

            if (isWordAdded !== undefined) {
                result.isWordAdded = isWordAdded;
            }

            res.status(200).json({ data: result });
        },
        {
            unexpectedErrMsg: 'Произошла ошибка при поиске слова',
        }
    );

    export const getWords = getWordsWrapper(WordsService.getWords);

    export const getWordsToLearn = getWordsWrapper(WordsService.getWordsToLearn);

    function getWordsWrapper(callback: (typeof WordsService)['getWords'] | (typeof WordsService)['getWordsToLearn']) {
        return handleServerErrors<void, void, GetWordsReq>(async (req, res) => {
            const { dictId, limit, offset } = req.query;
            const result = await callback(dictId, limit, offset);

            res.status(200).json({ data: result });
        });
    }

    export const addWord = handleServerErrors<AddWordReq>(
        async (req, res) => {
            const { dictId, word } = req.body;
            const result = await WordsService.addWord(dictId, word);

            res.status(201).json({ data: result });
        },
        {
            unexpectedErrMsg: 'Произошла ошибка при добавлении нового слова',
        }
    );

    export const deleteWords = handleServerErrors<DeleteWordsReq>(
        async (req, res) => {
            const { dictId, words } = req.body;
            const result = await WordsService.deleteWords(dictId, words);

            res.status(200).json({ data: result });
        },
        {
            unexpectedErrMsg: 'Произошла ошибка при попытке удалить слово',
        }
    );

    export const learnWord = handleServerErrors<LearnWordReq>(
        async (req, res) => {
            const { wordId, feedback } = req.body;

            const result = await WordsService.learnWord(wordId, feedback);

            res.status(200).json({ data: result });
        },
        { unexpectedErrMsg: 'Произошла ошибка при попытке выучить слово' }
    );

    export const searchWords = handleServerErrors<void, void, SearchWordsReq>(async (req, res) => {
        const { dictId, word, limit, offset } = req.query;
        const result = await WordsService.searchWords(dictId, word, limit, offset);

        res.status(200).json({ data: result });
    });
}

export default WordsController;
