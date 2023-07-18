interface Phonetic {
    text: string;
    audio?: string;
}

export interface Definition {
    definition: string;
    example: string;
}

export interface PartsOfSpeech<T = string> {
    verb: T[];
    noun: T[];
    adjective: T[];
    pronoun: T[];
    numerals: T[];
    adverb: T[];
    participle: T[];
}

export interface WordInfo {
    source: string;
    translations: PartsOfSpeech;
    definitions: PartsOfSpeech<Definition>;
    phonetic?: Phonetic;
    firstTranslations: string[];
    hasDefinitions: boolean;
}

export interface Word extends WordInfo {
    _id: string;
    repeated: number;
    repeatAt: number;
}

export interface Language {
    _id: string;
    name: string;
    wordsLearned: number;
    words: Word[];
    wordsToLearn: Word[];
    wordsAmount: number;
    wordsToLearnAmount: number;
    wordsFetchOffset: number;
    wordsToLearnFetchOffset: number;
}

export type RouteParams = {
    dictId?: string;
};

export interface User {
    login: string;
    languages: Language[];
}

export enum LearnFeedbacks {
    EASY = 'easy',
    NORMAL = 'normal',
    HARD = 'hard',
}
