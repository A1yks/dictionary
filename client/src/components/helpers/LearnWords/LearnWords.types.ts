import { Language } from 'types/common';

export enum WordGrade {
    EASY,
    NORMAL,
    HARD,
}

export type LearnWordsProps = {
    language: Language;
};
