import { LearnFeedbacks } from '../../controllers/words/types';
import Language from '../../models/Language';
import Word, { IWord } from '../../models/Word';
import getNextRepeatTime from '../../utils/getNextRepeatTime';
import translate from '../../utils/translate';
import { DeleteWordsRes, LearnWordRes } from './types';

class WordsService {
    async translateWord(word: string): Promise<Partial<IWord> | Service.Error> {
        const translation = await translate(word);

        if (translation === null) {
            return { status: 404, error: 'Не удалось найти искомое слово' };
        }

        return translation;
    }

    async addWord(langId: string, word: IWord): Promise<IWord | Service.Error> {
        const language = await Language.findById(langId);

        if (language === null) {
            return { status: 404, error: 'Не удалось найти словарь, в который необходимо добавить слово' };
        }

        const currWord = await Word.findOne({ language: langId, source: word.source.toLowerCase() });

        if (currWord !== null) {
            return { status: 409, error: 'Такое слово уже добавлено' };
        }

        const newWord = new Word(word);

        newWord.language = language._id;
        language.words.push(newWord._id);
        await Promise.all([language.save(), newWord.save()]);

        return newWord;
    }

    async deleteWords(langId: string, words: IWord[]): Promise<DeleteWordsRes | Service.Error> {
        const wordIds = words.map((word) => word.id);
        const result = await Word.deleteMany({ _id: { $in: wordIds } });

        if (!result) {
            return { status: 404, error: 'Удаляемое слово не было найдено' };
        }

        const language = await Language.findById(langId).populate('words wordsToLearn');

        if (language === null) {
            return { status: 404, error: 'Не удалось найти словарь, из которого необходимо удалить слово' };
        }

        return { words: language.words, wordsToLearn: language.wordsToLearn };
    }

    async learnWord(wordId: string, feedback: LearnFeedbacks): Promise<LearnWordRes | Service.Error> {
        const repeatAt = getNextRepeatTime(feedback);
        const result = await Word.findByIdAndUpdate(wordId, { $set: { repeatAt }, $inc: { repeated: 1 } });

        if (!result) {
            return { status: 404, error: 'Изучаемое слово не найдено' };
        }

        return { repeatAt };
    }
}

export default new WordsService();
