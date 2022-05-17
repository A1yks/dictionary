import { Language, Word } from 'types/common';

export interface IAppContext {
    languages: Language[];
    addLanguage: (languageName: string) => Promise<void>;
    deleteLanguage: (langId: string) => Promise<void>;
    editLanguage: (langId: string, languageName: string) => Promise<void>;
    chooseLanguage: (language: Language | string) => void;
    addWord: (langId: string, word: Word) => Promise<void>;
    deleteWords: (langId: string, word: Word[]) => Promise<void>;
    getLanguage: (langId: string) => Language;
    learnWord: (langId: string, word: Word) => void;
    chosenLanguage: Language | null;
    languagesLoaded: boolean;
}
