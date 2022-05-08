import { model, Schema, SchemaDefinitionProperty } from 'mongoose';
import transformObject from '../utils/transformObject';

export interface IPartsOfSpeech<T = string> {
    verb: T[];
    noun: T[];
    adjective: T[];
    pronoun: T[];
    numerals: T[];
    adverb: T[];
    participle: T[];
}

export interface IPhonetic {
    text: string;
    audio?: string;
}

export interface IDefinition {
    definition: string;
    example: string;
}

export interface IWord {
    source: string;
    phonetic?: IPhonetic;
    translations: IPartsOfSpeech;
    definitions: IPartsOfSpeech<IDefinition>;
    firstTranslations: string[];
    hasDefinitions: boolean;
}

export interface ILanguage {
    name: string;
    wordsLearned: number;
    words: IWord[];
    wordsToLearn: IWord[];
}

function partsOfSpeech<T>(type: any): SchemaDefinitionProperty<IPartsOfSpeech<T>> {
    return {
        noun: [type],
        verb: [type],
        adjective: [type],
        adverb: [type],
        pronoun: [type],
        numerals: [type],
        participle: [type],
    };
}

const partsOfSpeechContainStrings = partsOfSpeech<string>(String);
const partsOfSpeechContainDefinitions = partsOfSpeech<IDefinition>({
    definition: String,
    example: String,
    _id: false,
});

const word: SchemaDefinitionProperty<IWord> = {
    source: String,
    translations: partsOfSpeechContainStrings,
    definitions: partsOfSpeechContainDefinitions,
    firstTranslations: [String],
    phonetic: {
        text: String,
        audio: String,
    },
    hasDefinitions: Boolean,
    _id: false,
};

const languageSchema = new Schema<ILanguage>(
    {
        name: String,
        wordsLearned: Number,
        words: [word],
        wordsToLearn: [word],
    },
    { collection: 'languages', toJSON: { virtuals: true, transform: transformObject } }
);

export default model<ILanguage>('Language', languageSchema);
