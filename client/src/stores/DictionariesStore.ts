import { makeAutoObservable } from 'mobx';

class DictionariesStore {
    workingLanguageId = '';

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setWorkingLanguageId(dictId: string) {
        this.workingLanguageId = dictId;
    }
}

export default DictionariesStore;
