import Joi from 'joi';
import { joiResolver as hookFormJoiResolver } from '@hookform/resolvers/joi';

function joiResolver(schema?: Joi.Schema) {
    if (schema === undefined) {
        return undefined;
    }

    return hookFormJoiResolver(schema, {
        errors: { wrap: { label: false } },
        abortEarly: false,
    });
}

export default joiResolver;
