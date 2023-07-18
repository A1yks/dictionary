import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthCookies, TokenPayload } from '../types/auth';

function verifyToken(req: Server.Request, res: Server.Response, next: NextFunction) {
    const cookies = req.cookies as AuthCookies;
    const token = cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'Токен авторизации отсутствует' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenPayload) => {
        if (err) {
            return res.status(401).json({ error: 'Невалидный токен' });
        }

        req.userId = (tokenPayload as TokenPayload).userId;
        next();
    });
}

export default verifyToken;
