import { ErrorTypes } from 'enums/errors';
import User, { IUser } from 'models/User';
import { FilterQuery, Types } from 'mongoose';
import LanguagesService from 'services/languages/LanguagesService';

namespace UserService {
    export async function getUser(userId: Types.ObjectId, withPassword = false) {
        return await getUserWithErrorCheck({ _id: userId }, withPassword);
    }

    export async function getUserByLogin(login: string, withPassword = false) {
        return await getUserWithErrorCheck({ login }, withPassword);
    }

    export async function getAccountData(userId: Types.ObjectId) {
        const languages = await LanguagesService.getLanguages(userId);

        return { languages };
    }

    async function getUserWithErrorCheck(query: FilterQuery<IUser>, withPassword = false) {
        const userDoc = await User.findOne(query);

        if (!userDoc) {
            throw new Error('Пользователь не найден', { cause: ErrorTypes.NOT_FOUND });
        }

        const user = userDoc.toJSON();

        if (!withPassword) {
            delete (user as Partial<IUser>).password;
        }

        const accountData = await getAccountData(user.id);

        Object.assign(user, accountData);

        return user;
    }
}

export default UserService;
