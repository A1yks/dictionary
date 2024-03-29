import { NextFunction } from 'express';
import Joi from 'joi';

type ValidationConfig =
    | {
          validateBody?: true;
          validateParams?: false;
      }
    | {
          validateBody?: false;
          validateParams?: true;
      };

function validate(schema: Joi.Schema, config: ValidationConfig = { validateBody: true, validateParams: false }) {
    return function (req: Server.Request, res: Server.Response, next: NextFunction) {
        const { error } = schema.validate(config.validateBody ? req.body : config.validateParams ? req.params : req.body);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        next();
    };
}

export default validate;
