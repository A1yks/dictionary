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

export interface Word {
    source: string;
    translations: PartsOfSpeech;
    definitions: PartsOfSpeech<Definition>;
    phonetic?: Phonetic;
    firstTranslations: string[];
    hasDefinitions: boolean;
    repeatAt: number;
}

export interface Language {
    id: string;
    name: string;
    wordsLearned: number;
    words: Word[];
    wordsToLearn: Word[];
}

export type RouteParams = {
    langId?: string;
};

export interface User {
    login: string;
    languages: Language[];
}
