export interface ServerResponse<T = any> {
    data: T;
}

export interface ServerError {
    error: string;
}
