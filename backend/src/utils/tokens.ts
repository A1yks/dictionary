import { TokenPayload } from '../types/auth';
import jwt from 'jsonwebtoken';

export const TOKEN_LIFETIME = 7 * 24 * 60 * 60 * 1000;

export async function signToken(payload: TokenPayload) {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: TOKEN_LIFETIME / 1000 }, (err, token) => {
            if (err) {
                reject(err);
            } else if (token === undefined) {
                reject('Проищошла ошибка при попытке создать токен');
            } else {
                resolve(token);
            }
        });
    });
}
