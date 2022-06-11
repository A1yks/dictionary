import { makeAutoObservable } from 'mobx';

class DictionariesStore {
    workingLanguageId: string = '';

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setWorkingLanguageId(langId: string) {
        this.workingLanguageId = langId;
    }
}

export default DictionariesStore;
