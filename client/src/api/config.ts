import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ServerError, ServerResponse } from './types';

const instance = axios.create({
    baseURL: '/api',
});

instance.interceptors.response.use(
    (response: AxiosResponse<ServerResponse>) => response.data.data,
    (error: AxiosError<ServerError>) => {
        if (error.response?.data) {
            return Promise.reject(error.response.data.error);
        }

        return Promise.reject(error.message);
    }
);

function API<T>(url: string, cfg?: Omit<AxiosRequestConfig, 'url'>) {
    const config: AxiosRequestConfig = cfg || {};

    config.url = url;

    return instance.request<any, T>(config);
}

export default API;
