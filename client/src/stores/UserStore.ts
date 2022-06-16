import UserAPI from 'api/UserAPI';
import { makeAutoObservable } from 'mobx';
import { User } from 'types/common';
import Request from './decorators/Request';
import RootStore from './RootStore';
import { IRequest } from './types';

class UserStore implements IRequest {
    user: User | null = null;
    loading: boolean = false;
    error: string = '';

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    @Request
    async getCurrentUser() {
        const user = await UserAPI.getUser();

        this.setUser(user);
        this.rootStore.languagesStore.setLanguages(user.languages);
    }

    setUser(user: User | null) {
        this.user = user;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setError(error: string) {
        this.error = error;
    }
}

export default UserStore;
