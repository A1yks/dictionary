import { Types } from 'mongoose';

export type Token = string;

export interface TokenPayload {
    userId: Types.ObjectId;
}

export interface AuthCookies {
    authToken: string;
}
