import AuthAPI from 'api/AuthAPI';
import { makeAutoObservable } from 'mobx';
import Request from 'stores/decorators/Request';
import { IRequest } from 'stores/types';
import { User } from 'types/common';
import { RootStore } from './RootStore';

class AuthStore implements IRequest {
    loading = false;
    error = '';

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get isLoggedIn() {
        return this.rootStore.userStore.user !== null;
    }

    @Request
    async login(username: string, password: string) {
        const user = await AuthAPI.login(username, password);

        this.setUser(user);
    }

    @Request
    async register(username: string, passwords: [string, string]) {
        const user = await AuthAPI.register(username, passwords);

        this.setUser(user);
    }

    // TODO add current token to the server blacklist
    logout() {
        this.setUser(null);
    }

    setError(error: string) {
        this.error = error;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    private setUser(user: User | null) {
        this.rootStore.userStore.setUser(user);
    }
}

export default AuthStore;
