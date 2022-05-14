import { IWord } from '../../models/Word';

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
