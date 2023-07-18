import LanguagesAPI from 'api/LanguagesAPI';
import NoSuchLanguageError from 'errors/NoSuchLanguageError';
import { makeAutoObservable } from 'mobx';
import Request from 'stores/decorators/Request';
import { RootStore } from 'stores/RootStore';
import { IRequest } from 'stores/types';
import { Language } from 'types/common';

class LanguagesStore implements IRequest {
    error = '';
    loading = false;
    languages: Language[] = [];
    selectedLanguage: Language | null = null;
    // languagesLoaded: boolean = false;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    @Request
    async fetchLanguages() {
        const languages = await LanguagesAPI.getLanguages();

        this.setLanguages(languages);
        // this.setLanguagesLoaded(true);
    }

    @Request
    async addLanguage(langName: string) {
        const addedLang = await LanguagesAPI.addLanguage(langName);
        this.setLanguages([...this.languages, addedLang]);
    }

    @Request
    async deleteLanguage(dictId: string) {
        await LanguagesAPI.deleteLanguage(dictId);
        this.setLanguages(this.languages.filter((lang) => lang._id !== dictId));
    }

    @Request
    async editLanguageName(dictId: string, langName: string) {
        const editedLang = await LanguagesAPI.editLanguageName(dictId, langName);

        this.setLanguages(
            this.languages.map((lang) => {
                if (lang._id !== dictId) return lang;

                return { ...lang, ...editedLang };
            })
        );
    }

    setWordsFetchOffset(offset: number) {
        if (this.selectedLanguage === null) return;

        this.selectedLanguage.wordsFetchOffset = offset;
    }

    setWordsToLearnFetchOffset(offset: number) {
        if (this.selectedLanguage === null) return;

        this.selectedLanguage.wordsToLearnFetchOffset = offset;
    }

    addWordsFetchOffset(offset: number) {
        if (this.selectedLanguage === null) return;

        if (this.selectedLanguage.wordsFetchOffset === undefined) {
            this.selectedLanguage.wordsFetchOffset = 20;
        }

        this.selectedLanguage.wordsFetchOffset += offset;
    }

    addWordsToLearnFetchOffset(offset: number) {
        if (this.selectedLanguage === null) return;

        if (this.selectedLanguage.wordsToLearnFetchOffset === undefined) {
            this.selectedLanguage.wordsToLearnFetchOffset = 20;
        }

        this.selectedLanguage.wordsToLearnFetchOffset += offset;
    }

    setWords(words: Language['words']) {
        if (this.selectedLanguage === null) return;

        this.selectedLanguage.words = words;
    }

    setWordsAmount(amount: number) {
        if (!this.selectedLanguage) return;

        this.selectedLanguage.wordsAmount = amount;
    }

    setWordsToLearnAmount(amount: number) {
        if (!this.selectedLanguage) return;

        this.selectedLanguage.wordsToLearnAmount = amount;
    }

    setWordsToLearn(wordsToLearn: Language['wordsToLearn']) {
        if (this.selectedLanguage === null) return;

        this.selectedLanguage.wordsToLearn = wordsToLearn;
    }

    selectLanguage(lang: Language | string) {
        let languageObject: Language | undefined = undefined;

        if (typeof lang === 'string') {
            languageObject = this.languages.find(({ _id }) => lang === _id);
        } else {
            languageObject = lang;
        }

        if (languageObject !== undefined) {
            this.selectedLanguage = languageObject;
        } else {
            throw new NoSuchLanguageError();
        }
    }

    incWordsAmount() {
        if (this.selectedLanguage !== null) {
            this.selectedLanguage.wordsAmount++;
        }
    }

    decWordsToLearnAmount() {
        if (this.selectedLanguage !== null) {
            this.selectedLanguage.wordsToLearnAmount--;
        }
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setError(error: string) {
        this.error = error;
    }

    setLanguages(languages: Language[]) {
        this.languages = languages;
    }

    // private setLanguagesLoaded(loaded: boolean) {
    //     this.languagesLoaded = loaded;
    // }
}

export default LanguagesStore;
