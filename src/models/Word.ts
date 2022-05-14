import { Model, model, ObjectId, Schema, SchemaDefinitionProperty } from 'mongoose';
import getNextDayUnix from '../utils/getNextDayUnix';
import schemaQueryHandler from '../utils/schemaQueryHandler';
import transformObject from '../utils/transformObject';
import Language from './Language';

export interface IPhonetic {
    text: string;
    audio?: string;
}

export interface IDefinition {
    definition: string;
    example: string;
}

export interface IPartsOfSpeech<T = string> {
    verb: T[];
    noun: T[];
    adjective: T[];
    pronoun: T[];
    numerals: T[];
    adverb: T[];
    participle: T[];
}

export interface IWord {
    id: string;
    source: string;
    phonetic?: IPhonetic;
    translations: IPartsOfSpeech;
    definitions: IPartsOfSpeech<IDefinition>;
    firstTranslations: string[];
    hasDefinitions: boolean;
    repeatAt: number;
    language: ObjectId;
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

const wordSchema = new Schema<IWord, Model<IWord>>(
    {
        source: { type: String, trim: true, required: true, lowercase: true },
        translations: partsOfSpeechContainStrings,
        definitions: partsOfSpeechContainDefinitions,
        firstTranslations: [String],
        phonetic: {
            text: String,
            audio: String,
        },
        hasDefinitions: Boolean,
        repeatAt: { type: Number, default: getNextDayUnix },
        language: { type: Schema.Types.ObjectId, ref: 'Language' },
    },
    {
        collection: 'words',
        toJSON: { virtuals: true, transform: transformObject },
    }
);

schemaQueryHandler<IWord>(wordSchema, 'findOneAndRemove', async function (document) {
    const langId = document.language;
    const wordId = document._id;

    await Language.findByIdAndUpdate(langId, { $pull: { words: { $in: wordId }, wordsToLearn: { $in: wordId } } });
});

schemaQueryHandler<IWord>(wordSchema, 'deleteMany', async function (ids) {
    const word: IWord | null = await this.model.findById(ids[0]);

    if (!word) return;

    const langId = word.language;

    await Language.findByIdAndUpdate(langId, { $pull: { words: { $in: ids }, wordsToLearn: { $in: ids } } });
});

export default model<IWord>('Word', wordSchema);
