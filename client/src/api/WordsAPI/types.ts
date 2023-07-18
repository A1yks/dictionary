import { Word } from 'types/common';

export interface DeleteWordsRes {
    wordsAmount: number;
    wordsToLearnAmount: number;
}

export interface LearnWordRes {
    repeatAt: number;
}

export interface GetWordsRes {
    words: Word[];
    wordsAmount: number;
}

export interface GetWordsToLearnRes {
    words: Word[];
    wordsToLearnAmount: number;
}

export interface SearchWordsRes {
    words: Word[];
    wordsAmount: number;
}
