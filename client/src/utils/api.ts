import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export interface ServerResponse<T = any> {
    data: T;
}

export interface ServerError {
    error: string;
}

const instance = axios.create({
    baseURL: '/api',
});

instance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<ServerError>) => {
        if (error.response) {
            return Promise.reject(error.response.data.error);
        }

        if (error.request) {
            return Promise.reject(error.request);
        }

        return Promise.reject(error.message);
    }
);

const API = <T>(url: string, cfg?: Omit<AxiosRequestConfig, 'url'>) => {
    const config: AxiosRequestConfig = cfg || {};

    config.url = url;

    return instance.request<any, ServerResponse<T>>(config);
};

export default API;
