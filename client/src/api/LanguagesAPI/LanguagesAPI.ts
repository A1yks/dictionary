import { Language } from 'types/common';
import API from 'api';

class LanguagesAPI {
    async getLanguages() {
        return await API<Language[]>('/languages');
    }

    async addLanguage(langName: string) {
        return await API<Language>('/languages/add', { method: 'POST', data: { langName } });
    }

    async deleteLanguage(langId: string) {
        await API('/languages/delete', { method: 'DELETE', data: { langId } });
    }

    async editLanguageName(langId: string, langName: string) {
        return await API<Language>('/languages/edit', { method: 'PATCH', data: { langId, langName } });
    }
}

export default new LanguagesAPI();
