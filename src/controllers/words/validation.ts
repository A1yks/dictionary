import Joi from 'joi';
import { IDefinition, IPartsOfSpeech, IPhonetic, IWord } from '../../models/Word';
import objectIdValidation from '../../utils/objectIdValidation';
import { langId } from '../languages/validation';
import { AddWordReq, DeleteWordsReq, SearchWordParams } from './types';

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

const clientWordSchema = Joi.object<Partial<IWord>>().keys({
    source: Joi.string().required(),
    phonetic: phoneticSchema,
    translations: getPartsOfSpeechSchema(Joi.string()),
    definitions: getPartsOfSpeechSchema(definitionSchema),
    firstTranslations: Joi.array().items(Joi.string()),
    hasDefinitions: Joi.boolean(),
});

const wordSchema = clientWordSchema.keys({
    id: Joi.string().required().custom(objectIdValidation),
    repeatAt: Joi.number().required(),
    language: langId,
});

export const searchWordSchema = Joi.object<SearchWordParams>()
    .keys({
        word: Joi.string().required(),
    })
    .allow('')
    .options({ allowUnknown: true });

export const addWordSchema = Joi.object<AddWordReq>().keys({
    langId,
    word: clientWordSchema.required(),
});

export const deleteWordsSchema = Joi.object<DeleteWordsReq>().keys({
    langId,
    words: Joi.array().items(wordSchema).required(),
});
