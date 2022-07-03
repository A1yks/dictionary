import { IWord } from '../../models/Word';

export enum LearnFeedbacks {
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard',
}

export interface TranslateWordParams {
    word: string;
}

export interface TranslateWordQueryPamars {
    langId?: string;
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
