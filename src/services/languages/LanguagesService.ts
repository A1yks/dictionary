import Language, { ILanguage } from '../../models/Language';

class LanguagesService {
    async getLanguages() {
        const languages = await Language.find({}).populate('words wordsToLearn');

        return languages;
    }

    async addLanguage(langName: string) {
        const language = new Language({ name: langName });

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
