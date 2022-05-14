import Joi from 'joi';
import objectIdValidation from '../../utils/objectIdValidation';
import { AddLanguageReq, DeleteLanguageReq, EditLanguageNameReq } from './types';

export const langId = Joi.string().required().custom(objectIdValidation);
const languageName = Joi.string().min(3).required();

export const addLanguageSchema = Joi.object<AddLanguageReq>().keys({
    languageName,
});

export const deleteLanguageSchema = Joi.object<DeleteLanguageReq>().keys({
    langId,
});

export const editLanguageNameSchema = Joi.object<EditLanguageNameReq>({
    langId,
    languageName,
});
