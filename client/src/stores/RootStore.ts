import DictionariesStore from 'stores/DictionariesStore';
import LanguagesStore from 'stores/LanguagesStore';
import AuthStore from 'stores/AuthStore';
import WordsStore from 'stores/WordsStore';
import UserStore from './UserStore';

export class RootStore {
    authStore: AuthStore;
    userStore: UserStore;
    languagesStore: LanguagesStore;
    wordsStore: WordsStore;
    dictionariesStore: DictionariesStore;

    constructor() {
        this.authStore = new AuthStore(this);
        this.userStore = new UserStore(this);
        this.languagesStore = new LanguagesStore(this);
        this.wordsStore = new WordsStore(this);
        this.dictionariesStore = new DictionariesStore();
    }
}

export const rootStore = new RootStore();
