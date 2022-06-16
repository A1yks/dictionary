import { IUser } from '../../models/User';

export interface AuthRes {
    user: IUser;
    token: string;
}
