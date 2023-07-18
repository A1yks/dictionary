import { Model, model, Types, Schema, SchemaDefinitionProperty } from 'mongoose';
import getNextRepeatTime from '../utils/getNextRepeatTime';
import schemaQueryHandler from '../utils/schemaQueryHandler';
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
    firstTranslations: Types.Array<string>;
    hasDefinitions: boolean;
    repeatAt: number;
    repeated: number;
    language: Types.ObjectId;
    isWordAdded?: boolean;
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
        repeatAt: { type: Number, default: getNextRepeatTime },
        repeated: { type: Number, default: 0 },
        language: { type: Schema.Types.ObjectId, ref: 'Language' },
    },
    {
        collection: 'words',
        toJSON: { virtuals: true },
    }
);

schemaQueryHandler<IWord>(wordSchema, 'findOneAndRemove', async function (document) {
    const dictId = document.language;
    const wordId = document._id;

    await Language.findByIdAndUpdate(dictId, { $pull: { words: { $in: wordId }, wordsToLearn: { $in: wordId } } });
});

schemaQueryHandler<IWord>(wordSchema, 'deleteMany', async function (ids) {
    const word: IWord | null = await this.model.findById(ids[0]);

    if (!word) return;

    const dictId = word.language;

    await Language.findByIdAndUpdate(dictId, { $pull: { words: { $in: ids }, wordsToLearn: { $in: ids } } });
});

export default model<IWord>('Word', wordSchema);
