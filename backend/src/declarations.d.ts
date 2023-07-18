import express from 'express';
import { Types } from 'mongoose';

declare global {
    namespace Server {
        export type ResponseBody<T = any> = { data: T } | { error: string };

        export interface Request<Body = any, Params = any, QueryParams = any> extends express.Request<Params, any, any, QueryParams> {
            body: Body;
            userId?: Types.ObjectId;
        }

        export type Response<T = any> = express.Response<ResponseBody<T>>;
    }

    namespace Service {
        export interface Error {
            status: number;
            error: string;
        }
    }
}

export {};
