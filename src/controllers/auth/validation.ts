import Joi from 'joi';
import { LoginReq, RegisterReq } from './types';

const usernameSchema = Joi.string().min(3).max(15).required();
const passwordSchema = Joi.string().min(6).max(30).required();

export const loginSchema = Joi.object<LoginReq>().keys({
    login: usernameSchema,
    password: passwordSchema,
});

export const registerSchema = Joi.object<RegisterReq>().keys({
    login: usernameSchema,
    passwords: Joi.array().length(2).items(passwordSchema),
});
