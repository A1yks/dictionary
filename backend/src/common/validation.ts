import Joi from 'joi';
import objectIdValidation from 'utils/objectIdValidation';
import { PaginationReq } from './requestTypes';

export const dictId = Joi.string().required().custom(objectIdValidation);
export const limitFieldSchema = Joi.number().integer().min(1);
export const offsetFieldSchema = Joi.number().integer().min(0);

export const paginationSchema = Joi.object<PaginationReq>().keys({
    limit: limitFieldSchema,
    offset: offsetFieldSchema,
});
