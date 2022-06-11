import DictionariesStore from 'stores/DictionariesStore';
import LanguagesStore from 'stores/LanguagesStore';
import WordsStore from 'stores/WordsStore/WordsStore';

class RootStore {
    languagesStore: LanguagesStore;
    wordsStore: WordsStore;
    dictionariesStore: DictionariesStore;

    constructor() {
        this.languagesStore = new LanguagesStore(this);
        this.wordsStore = new WordsStore(this);
        this.dictionariesStore = new DictionariesStore();
    }
}

export default RootStore;
