import WordsAPI from 'api/WordsAPI';
import { makeAutoObservable, observable } from 'mobx';
import { MutableRefObject } from 'react';
import Request from 'stores/decorators/Request';
import RootStore from 'stores/RootStore';
import { IRequest } from 'stores/types';
import { Word } from 'types/common';

class WordsStore implements IRequest {
    error: string = '';
    loading: boolean = false;
    wordToDeleteRef: MutableRefObject<Word | null> = { current: null };
    wordInfo: Word | null = null;
    showTranslation: boolean = true;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, { wordToDeleteRef: observable.ref }, { autoBind: true });
    }

    get words() {
        return this.language?.words || null;
    }

    get wordsToLearn() {
        return this.language?.wordsToLearn || null;
    }

    @Request
    async addWord(word: Word) {
        if (!this.language || !this.words) return;

        const addedWord = await WordsAPI.addWord(this.language.id, word);

        this.setWords([...this.words, addedWord]);
    }

    @Request
    async deleteWords(wordsToDelete: Word[]) {
        if (!this.language) return;

        const { words, wordsToLearn } = await WordsAPI.deleteWords(this.language.id, wordsToDelete);

        this.setWords(words);
        this.setWordsToLearn(wordsToLearn);
    }

    async learnWord(word: Word) {
        if (!this.language) return;

        this.language.wordsToLearn = this.language.wordsToLearn.filter(({ source }) => word.source !== source);
    }

    setWordToDelete(word: Word) {
        this.wordToDeleteRef.current = word;
    }

    setWordInfo(wordInfo: Word) {
        this.wordInfo = wordInfo;
    }

    setShowTranslation(show: boolean) {
        this.showTranslation = show;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setError(error: string) {
        this.error = error;
    }

    private get language() {
        return this.rootStore.languagesStore.selectedLanguage;
    }

    private setWords(words: Word[]) {
        if (!this.language) return;

        this.language.words = words;
    }

    private setWordsToLearn(wordsToLearn: Word[]) {
        if (!this.language) return;

        this.language.wordsToLearn = wordsToLearn;
    }
}

export default WordsStore;
