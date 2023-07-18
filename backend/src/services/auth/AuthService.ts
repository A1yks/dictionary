import User from '../../models/User';
import bcrypt from 'bcrypt';
import { AuthRes } from './types';
import { signToken } from '../../utils/tokens';
import UserService from '../user/UserService';

const authError = 'Неверный логин и/или пароль';

class AuthService {
    async register(login: string, passwords: [string, string]): Promise<AuthRes | Service.Error> {
        const [password, confPassword] = passwords;

        if (password !== confPassword) {
            return { status: 401, error: 'Пароли не совпадают' };
        }

        const userExists = await User.exists({ login });

        if (userExists) {
            return { status: 409, error: 'Пользователь с таким логином уже зарегистрирован' };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ login, password: hashedPassword });
        const token = await signToken({ userId: user._id });

        await user.save();

        return { user, token };
    }

    async login(login: string, password: string): Promise<AuthRes | Service.Error> {
        const user = await UserService.getUserByLogin(login, true);

        if (!user) {
            return { status: 404, error: authError };
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return { status: 401, error: authError };
        }

        const token = await signToken({ userId: user.id });

        return { user, token };
    }
}

export default new AuthService();
