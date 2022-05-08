interface IRequestResult<T> {
	success: boolean;
	data: T;
	message?: string;
}

interface IRequest {
	post<T>(path: string, data: Record<string, any>): Promise<IRequestResult<T>>;
	get<T>(path: string): Promise<IRequestResult<T>>;
}

const request: IRequest = {
	async post<T = undefined>(path: string, data: Record<string, any>): Promise<IRequestResult<T>> {
		const request = await fetch(`/api/${path.replace(/^\//, '')}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const response: IRequestResult<T> = await request.json();
		return response;
	},
	async get<T>(path: string): Promise<IRequestResult<T>> {
		const request = await fetch(`/api/${path.replace(/^\//, '')}`);
		const response: IRequestResult<T> = await request.json();
		return response;
	},
};

export default request;
