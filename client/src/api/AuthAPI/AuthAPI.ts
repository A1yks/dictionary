import { LoginReq, RegisterReq } from '@backend/controllers/auth/types';
import API from 'api/config';
import { createMutation } from 'react-query-kit';
import { User } from 'types/common';

export const useLoginMutation = createMutation({
    mutationFn: ({ login, password }: LoginReq) => API<User>('/auth/login', { method: 'POST', data: { login, password } }),
});

export const useRegisterMutation = createMutation({
    mutationFn: ({ login, passwords }: RegisterReq) =>
        API<User>('/auth/register', {
            method: 'POST',
            data: {
                login,
                passwords,
            },
        }),
});

class AuthApi {
    async login(login: string, password: string) {
        return await API<User>('/auth/login', {
            method: 'POST',
            data: {
                login,
                password,
            },
        });
    }

    async register(login: string, passwords: [string, string]) {
        return await API<User>('/auth/register', {
            method: 'POST',
            data: {
                login,
                passwords,
            },
        });
    }
}

export default new AuthApi();
