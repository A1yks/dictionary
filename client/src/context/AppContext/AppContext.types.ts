import { Language, Word } from 'types/common';

export interface IAppContext {
    languages: Language[];
    addLanguage: (languageName: string) => Promise<void>;
    deleteLanguage: (id: string) => Promise<void>;
    editLanguage: (id: string, data: Language) => Promise<void>;
    chooseLanguage: (language: Language | string) => void;
    addWord: (langId: string, word: Word) => Promise<void>;
    deleteWords: (langId: string, word: string[]) => Promise<void>;
    getLanguage: (id: string) => Language;
    learnWord: (langId: string, word: Word) => void;
    chosenLanguage: Language | null;
    languagesLoaded: boolean;
}
