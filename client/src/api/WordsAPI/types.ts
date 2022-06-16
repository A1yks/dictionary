import { Word } from 'types/common';

export interface DeleteWordsRes {
    words: Word[];
    wordsToLearn: Word[];
}

export interface LearnWordRes {
    repeatAt: number;
}
