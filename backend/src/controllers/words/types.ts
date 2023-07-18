import { Types } from 'mongoose';
import { IWord } from '../../models/Word';
import { PaginationReq } from 'common/requestTypes';

export enum LearnFeedbacks {
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard',
}

export interface TranslateWordParams {
    word: string;
}

export interface TranslateWordQueryPamars {
    dictId?: Types.ObjectId;
}

export interface GetWordsReq extends PaginationReq {
    dictId: Types.ObjectId;
}

export interface AddWordReq {
    dictId: Types.ObjectId;
    word: IWord;
}

export interface DeleteWordsReq {
    dictId: Types.ObjectId;
    words: IWord[];
}

export interface LearnWordReq {
    wordId: Types.ObjectId;
    feedback: LearnFeedbacks;
}

export interface SearchWordsReq extends PaginationReq {
    dictId: Types.ObjectId;
    word: string;
}
