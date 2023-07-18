import WordsAPI from 'api/WordsAPI';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { MutableRefObject } from 'react';
import Request from 'stores/decorators/Request';
import { RootStore } from 'stores/RootStore';
import { IRequest } from 'stores/types';
import { LearnFeedbacks, WordInfo, Word } from 'types/common';

export const WORDS_PER_PAGE = 20;
const MIN_WORDS_UNTIL_FETCH = 5;

class WordsStore implements IRequest {
    error: string = '';
    loading = false;
    wordToDeleteRef: MutableRefObject<Word | null> = { current: null };
    wordInfo: WordInfo | null = null;
    showTranslation = true;
    searchText = '';
    foundWordsAmount: number | undefined = undefined;
    private lastWordsToLearnFetched = false;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, { wordToDeleteRef: observable.ref }, { autoBind: true });
    }

    get words() {
        return this.language?.words || [];
    }

    get wordsToLearn() {
        return this.language?.wordsToLearn || [];
    }

    async addWord(word: Word) {
        this.rootStore.languagesStore.incWordsAmount();

        if (this.words.length < WORDS_PER_PAGE) {
            this.setWords([...this.words, word]);
        }
    }

    @Request
    async deleteWords(wordsToDelete: Word[]) {
        wordsToDelete.forEach((word) => {
            if (this.language === null) return;

            this.language.words = this.language.words.filter((w) => w._id !== word._id);
            this.language.wordsToLearn = this.language.wordsToLearn.filter((w) => w._id !== word._id);
        });
    }

    @Request
    async learnWord(word: Word, feedback: LearnFeedbacks) {
        await WordsAPI.learnWord(word._id, feedback);

        runInAction(async () => {
            this.wordsToLearn.splice(this.wordsToLearn.indexOf(word), 1);
            this.rootStore.languagesStore.decWordsToLearnAmount();

            if (this.language === null) return;

            if (this.language.wordsToLearn.length <= MIN_WORDS_UNTIL_FETCH && !this.lastWordsToLearnFetched) {
                await this.getWordsToLearn();

                runInAction(() => {
                    if (this.language === null) return;

                    if (this.language.wordsToLearnAmount <= MIN_WORDS_UNTIL_FETCH) {
                        this.lastWordsToLearnFetched = true;
                    }
                });
            }
        });
    }

    @Request
    async getWords(page: number) {
        if (this.language === null) return;

        let words: Word[];
        let wordsAmount: number;

        if (this.searchText.trim() === '') {
            ({ words, wordsAmount } = await WordsAPI.getWords(this.language._id, WORDS_PER_PAGE, (page - 1) * WORDS_PER_PAGE));
            this.setWordsAmount(wordsAmount);
        } else {
            ({ words, wordsAmount } = await WordsAPI.searchWords(
                this.language._id,
                this.searchText.trim(),
                WORDS_PER_PAGE,
                (page - 1) * WORDS_PER_PAGE
            ));
            this.setFoundWordsAmount(wordsAmount);
        }

        this.setWords(words);
    }

    @Request
    async getWordsToLearn() {
        if (this.language === null) return;

        const { words: wordsToLearn } = await WordsAPI.getWordsToLearn(this.language._id, WORDS_PER_PAGE, this.language.wordsToLearnFetchOffset);

        this.rootStore.languagesStore.addWordsToLearnFetchOffset(WORDS_PER_PAGE);
        this.setWordsToLearn(wordsToLearn);
    }

    setFoundWordsAmount(amount: this['foundWordsAmount']) {
        this.foundWordsAmount = amount;
    }

    setWordsAmount(amount: number) {
        if (!this.language) return;

        this.language.wordsAmount = amount;
    }

    setSearchText(text: string) {
        this.searchText = text;
    }

    setWordToDelete(word: Word) {
        this.wordToDeleteRef.current = word;
    }

    setWordInfo(wordInfo: WordInfo) {
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
