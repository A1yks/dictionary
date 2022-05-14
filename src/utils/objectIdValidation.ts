import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

function objectIdValidation(value: any, helper: Joi.CustomHelpers) {
    if (!isValidObjectId(value)) return helper.error('any.invalid');

    return value;
}

export default objectIdValidation;
