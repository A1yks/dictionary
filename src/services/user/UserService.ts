import User from '../../models/User';
import Word from '../../models/Word';

class UserService {
    async getUser(userId: string) {
        return await User.findById(userId).populate({
            path: 'languages',
            populate: {
                path: 'words wordsToLearn',
                model: Word,
            },
        });
    }
}

export default new UserService();
