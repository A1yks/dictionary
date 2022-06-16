import API from 'api/config';
import { User } from 'types/common';

class UserAPI {
    async getUser() {
        // user is getting with jwt token stored in cookies
        return await API<User>('/user');
    }
}

export default new UserAPI();
