import { Types } from 'mongoose';
import Language, { ILanguage } from '../../models/Language';
import User from '../../models/User';
import Word from '../../models/Word';
import { ErrorTypes } from 'enums/errors';
import WordsService from 'services/words/WordsService';

class LanguagesService {
    async getLanguages(userId: Types.ObjectId): Promise<Service.Error | ILanguage[]> {
        const user = await User.findById(userId).lean();

        if (!user) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        const languages = await Language.find({ _id: { $in: user.languages } })
            .populate({
                path: 'words',
                model: Word,
                options: {
                    limit: 20,
                },
            })
            .lean();

        await Promise.all(
            languages.map(async (lang) => {
                const [wordsAmount, { words, wordsToLearnAmount }] = await Promise.all([
                    WordsService.getWordsAmount(lang._id),
                    WordsService.getWordsToLearn(lang._id, 20, 0),
                ]);

                lang.wordsAmount = wordsAmount;
                lang.wordsToLearnAmount = wordsToLearnAmount;
                lang.wordsToLearn = words;
            })
        );

        return languages;
    }

    async addLanguage(userId: Types.ObjectId, langName: string): Promise<Service.Error | ILanguage> {
        const languageDoc = await Language.create({ name: langName, userId });
        const result = await User.findByIdAndUpdate(userId, { $push: { languages: languageDoc._id } });

        if (!result) {
            return { status: 404, error: 'Пользователь не найден' };
        }

        const language = languageDoc.toJSON();

        language.wordsAmount = 0;
        language.wordsToLearnAmount = 0;

        return language;
    }

    async deleteLanguage(dictId: string): Promise<void | Service.Error> {
        const result = await Language.findByIdAndDelete(dictId);

        if (!result) {
            return { status: 404, error: 'Языка с переданным id не существует' };
        }
    }

    async editLanguageName(dictId: string, langName: string) {
        const result = await Language.findByIdAndUpdate(dictId, { name: langName }, { new: true }).populate('words').lean();

        if (!result) {
            return { status: 404, error: 'Языка с переданным id не существует' };
        }

        return result;
    }
}

export default new LanguagesService();
