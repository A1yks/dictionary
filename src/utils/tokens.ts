import { TokenPayload } from '../types/auth';
import jwt from 'jsonwebtoken';

export const TOKEN_LIFETIME = 7 * 24 * 60 * 60 * 1000;

export function signToken(payload: TokenPayload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: TOKEN_LIFETIME / 1000 });
}
