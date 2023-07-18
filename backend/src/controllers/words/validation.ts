import Joi from 'joi';
import { IDefinition, IPartsOfSpeech, IPhonetic, IWord } from '../../models/Word';
import objectIdValidation from '../../utils/objectIdValidation';
import { AddWordReq, DeleteWordsReq, GetWordsReq, LearnFeedbacks, LearnWordReq, SearchWordsReq, TranslateWordParams } from './types';
import { dictId, paginationSchema } from 'common/validation';

function getPartsOfSpeechSchema(schema: Joi.Schema) {
    return Joi.object<IPartsOfSpeech>().keys({
        adjective: Joi.array().items(schema),
        adverb: Joi.array().items(schema),
        noun: Joi.array().items(schema),
        numerals: Joi.array().items(schema),
        participle: Joi.array().items(schema),
        pronoun: Joi.array().items(schema),
        verb: Joi.array().items(schema),
    });
}

const wordId = Joi.string().required().custom(objectIdValidation);
const wordSourceSchema = Joi.string();

const phoneticSchema = Joi.object<IPhonetic>()
    .keys({
        text: Joi.string().allow(''),
        audio: Joi.string().allow(''),
    })
    .unknown();

const definitionSchema = Joi.object<IDefinition>().keys({
    definition: Joi.string(),
    example: Joi.string(),
});

const clientWordSchema = Joi.object<Partial<IWord>>()
    .keys({
        source: Joi.string().required(),
        phonetic: phoneticSchema,
        translations: getPartsOfSpeechSchema(Joi.string()),
        definitions: getPartsOfSpeechSchema(definitionSchema),
        firstTranslations: Joi.array().items(Joi.string()),
        hasDefinitions: Joi.boolean(),
    })
    .unknown(true);

const wordSchema = clientWordSchema.keys({
    id: wordId,
    repeatAt: Joi.number().required(),
    repeated: Joi.number(),
    language: dictId,
});

export const translateWordSchema = Joi.object<TranslateWordParams>()
    .keys({
        word: wordSourceSchema.required(),
    })
    .allow('')
    .options({ allowUnknown: true });

export const getWordsSchema = paginationSchema.append<GetWordsReq>().keys({
    dictId,
});

export const addWordSchema = Joi.object<AddWordReq>().keys({
    dictId,
    word: clientWordSchema.required(),
});

export const deleteWordsSchema = Joi.object<DeleteWordsReq>().keys({
    dictId,
    words: Joi.array().items(wordSchema).required(),
});

export const learnWordSchema = Joi.object<LearnWordReq>().keys({
    wordId,
    feedback: Joi.string()
        .required()
        .valid(...Object.values(LearnFeedbacks)),
});

export const searchWordsSchema = paginationSchema.append<SearchWordsReq>().keys({
    dictId,
    word: wordSourceSchema.required(),
});
