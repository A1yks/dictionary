import Language, { ILanguage } from '../../models/Language';
import User from '../../models/User';

class LanguagesService {
    async getLanguages(userId: string): Promise<Service.Error | ILanguage[]> {
        const user = await User.findById(userId).lean();

        if (!user) {
            return { status: 404, error: 'Пользователь не найден' };
        }

        const languages = await Language.find({ _id: { $in: user.languages } }).populate('words wordsToLearn');

        return languages;
    }

    async addLanguage(userId: string, langName: string): Promise<Service.Error | ILanguage> {
        const language = new Language({ name: langName, userId });
        const result = await User.findByIdAndUpdate(userId, { $push: { languages: language._id } });

        if (!result) {
            return { status: 404, error: 'Пользователь не найден' };
        }

        await language.save();

        return language;
    }

    async deleteLanguage(langId: string): Promise<void | Service.Error> {
        const result = await Language.findByIdAndDelete(langId);

        if (!result) {
            return { status: 404, error: 'Языка с переданным id не существует' };
        }
    }

    async editLanguageName(langId: string, langName: string): Promise<ILanguage | Service.Error> {
        const result = await Language.findByIdAndUpdate(langId, { name: langName }, { new: true }).populate('words').lean();

        if (!result) {
            return { status: 404, error: 'Языка с переданным id не существует' };
        }

        return result;
    }
}

export default new LanguagesService();
