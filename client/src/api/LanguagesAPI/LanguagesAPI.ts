import { Language } from 'types/common';
import API from 'api';

class LanguagesAPI {
    async getLanguages() {
        return await API<Language[]>('/languages');
    }

    async addLanguage(langName: string) {
        return await API<Language>('/languages/add', { method: 'POST', data: { langName } });
    }

    async deleteLanguage(dictId: string) {
        await API('/languages/delete', { method: 'DELETE', data: { dictId } });
    }

    async editLanguageName(dictId: string, langName: string) {
        return await API<Language>('/languages/edit', { method: 'PATCH', data: { dictId, langName } });
    }
}

export default new LanguagesAPI();
