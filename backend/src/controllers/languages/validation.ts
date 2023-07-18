import Joi from 'joi';
import { AddLanguageReq, DeleteLanguageReq, EditLanguageNameReq } from './types';
import { dictId } from 'common/validation';

const langName = Joi.string().min(3).required();

export const addLanguageSchema = Joi.object<AddLanguageReq>().keys({
    langName,
});

export const deleteLanguageSchema = Joi.object<DeleteLanguageReq>().keys({
    dictId,
});

export const editLanguageNameSchema = Joi.object<EditLanguageNameReq>({
    dictId,
    langName,
});
