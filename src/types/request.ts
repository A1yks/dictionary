import { Request, Response } from 'express';

export interface CustomRequest<T> extends Request {
	body: T;
}

export interface Json {
	success: boolean;
	data?: any;
	message?: string;
}

export interface CustomResponse extends Response {
	json: (body?: Json) => this;
}
