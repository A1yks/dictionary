import express from 'express';

declare global {
    namespace Server {
        export type ResponseBody<T = any> = { data: T } | { error: string };

        export interface Request<Body = any, Params = any> extends express.Request<Params> {
            body: Body;
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