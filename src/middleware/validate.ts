import { NextFunction } from 'express';
import Joi from 'joi';

function validate(schema: Joi.Schema) {
    return function (req: Server.Request, res: Server.Response, next: NextFunction) {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        next();
    };
}

export default validate;
