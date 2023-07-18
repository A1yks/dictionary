import { ILanguage } from '../../models/Language';

export type DeleteWordsRes = Pick<ILanguage, 'words'>;

export interface LearnWordRes {
    repeatAt: number;
}
