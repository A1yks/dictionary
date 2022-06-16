import API from 'api/config';
import { User } from 'types/common';

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
