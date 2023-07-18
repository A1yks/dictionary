import { Types } from 'mongoose';
import { LearnFeedbacks } from '../../controllers/words/types';
import Language from '../../models/Language';
import Word, { IWord } from '../../models/Word';
import getNextRepeatTime from '../../utils/getNextRepeatTime';
import translate from '../../utils/translate';
import { ErrorTypes } from 'enums/errors';

namespace WordsService {
    export async function translateWord(word: string) {
        const translation = await translate(word);

        if (translation === null) {
            throw new Error('Не удалось найти искомое слово', { cause: ErrorTypes.NOT_FOUND });
        }

        return translation;
    }

    export async function getWords(dictId: Types.ObjectId, limit?: number, offset?: number) {
        const [words, wordsAmount] = await Promise.all([Word.find({ language: dictId }, null, { limit, skip: offset }), getWordsAmount(dictId)]);

        return { words, wordsAmount };
    }

    export async function getWordsToLearn(dictId: Types.ObjectId, limit?: number, offset?: number) {
        const [words, wordsToLearnAmount] = await Promise.all([
            Word.find({ language: dictId, repeatAt: { $lte: Math.trunc(Date.now() / 1000) } }, null, { limit, skip: offset }),
            getWordsToLearnAmount(dictId),
        ]);

        return { words, wordsToLearnAmount };
    }

    export async function getWordsAmount(dictId: Types.ObjectId) {
        return await Word.countDocuments({ language: dictId });
    }

    export async function getWordsToLearnAmount(dictId: Types.ObjectId) {
        return await Word.countDocuments({ language: dictId, repeatAt: { $lte: Math.trunc(Date.now() / 1000) } });
    }

    export async function searchWords(dictId: Types.ObjectId, word: string, limit?: number, offset?: number) {
        const [words, wordsAmount] = await Promise.all([
            Word.find({ language: dictId, source: new RegExp('^' + word, 'i') }, null, { limit, skip: offset }),
            Word.countDocuments({ language: dictId, source: new RegExp('^' + word, 'i') }),
        ]);

        return { words, wordsAmount };
    }

    export async function addWord(dictId: Types.ObjectId, word: IWord) {
        const language = await Language.findById(dictId);

        if (language === null) {
            throw new Error('Не удалось найти словарь, в который необходимо добавить слово', { cause: ErrorTypes.NOT_FOUND });
        }

        const currWord = await Word.findOne({ language: dictId, source: word.source.toLowerCase() });

        if (currWord !== null) {
            throw new Error('Такое слово уже добавлено', { cause: ErrorTypes.ALREADY_EXISTS });
        }

        const newWord = new Word(word);

        newWord.language = language._id;
        language.words.push(newWord._id);
        await Promise.all([language.save(), newWord.save()]);

        return newWord;
    }

    export async function deleteWords(dictId: Types.ObjectId, words: IWord[]) {
        const wordIds = words.map((word) => word.id);
        const result = await Word.deleteMany({ _id: { $in: wordIds } });

        if (!result) {
            throw new Error('Удаляемое слово не было найдено', { cause: ErrorTypes.NOT_FOUND });
        }

        const [wordsAmount, wordsToLearnAmount] = await Promise.all([getWordsAmount(dictId), getWordsToLearnAmount(dictId)]);

        return { wordsAmount, wordsToLearnAmount };
    }

    export async function learnWord(wordId: Types.ObjectId, feedback: LearnFeedbacks) {
        const repeatAt = getNextRepeatTime(feedback);
        const result = await Word.findByIdAndUpdate(wordId, { $set: { repeatAt }, $inc: { repeated: 1 } });

        if (!result) {
            throw new Error('Изучаемое слово не найдено', { cause: ErrorTypes.NOT_FOUND });
        }

        return { repeatAt };
    }

    export async function isWordAdded(dictId: Types.ObjectId, word: string) {
        return (await Word.exists({ source: word, language: dictId })) !== null;
    }
}

export default WordsService;
