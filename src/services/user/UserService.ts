import { HydratedDocument } from 'mongoose';
import User, { IUser } from '../../models/User';
import Word from '../../models/Word';

class UserService {
    async getUser(userId: string): Promise<IUser | Service.Error> {
        const user = await User.findById(userId);

        if (!user) {
            return { status: 404, error: 'Пользователь не найден' };
        }

        return this.populateUser(user);
    }

    async populateUser(user: HydratedDocument<IUser>) {
        return await user.populate({
            path: 'languages',
            populate: {
                path: 'words wordsToLearn',
                model: Word,
            },
        });
    }
}

export default new UserService();
