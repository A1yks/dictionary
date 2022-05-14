import Language, { ILanguage } from '../../models/Language';

class LanguagesService {
    async getLanguages() {
        const languages = await Language.find({}).populate('words wordsToLearn');

        return languages;
    }

    async addLanguage(languageName: string) {
        const language = new Language({ name: languageName });

        await language.save();
        return language;
    }

    async deleteLanguage(langId: string): Promise<void | Service.Error> {
        const result = await Language.findByIdAndDelete(langId);

        if (!result) {
            return { status: 404, error: 'Языка с переданным id не существует' };
        }
    }

    async editLanguageName(langId: string, languageName: string): Promise<ILanguage | Service.Error> {
        const result = await Language.findByIdAndUpdate(langId, { languageName }, { new: true }).lean();

        if (!result) {
            return { status: 404, error: 'Языка с переданным id не существует' };
        }

        return result;
    }
}

export default new LanguagesService();
