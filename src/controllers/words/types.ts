import { IWord } from '../../models/Word';

export enum LearnFeedbacks {
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard',
}

export interface SearchWordParams {
    word: string;
}

export interface AddWordReq {
    langId: string;
    word: IWord;
}

export interface DeleteWordsReq {
    langId: string;
    words: IWord[];
}

export interface LearnWordReq {
    wordId: string;
    feedback: LearnFeedbacks;
}
