import { AuthRes } from '../../services/auth/types';
import AuthService from '../../services/auth/AuthService';
import { isServiceError } from '../../types/guards';
import { TOKEN_LIFETIME } from '../../utils/tokens';
import { RegisterReq, LoginReq } from './types';
import { boundMethod } from 'autobind-decorator';

class AuthController {
    @boundMethod
    async register(req: Server.Request<RegisterReq>, res: Server.Response) {
        const { login, passwords } = req.body;

        try {
            const result = await AuthService.register(login, passwords);

            this.handleAuthResult(result, res, 201);
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при попытке зарегистрировать аккаунт' });
        }
    }

    @boundMethod
    async login(req: Server.Request<LoginReq>, res: Server.Response) {
        const { login, password } = req.body;

        try {
            const result = await AuthService.login(login, password);

            this.handleAuthResult(result, res);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Произошла ошибка при попытке войти в аккаунт' });
        }
    }

    private handleAuthResult(result: Service.Error | AuthRes, res: Server.Response, statusCode = 200) {
        if (isServiceError(result)) {
            return res.status(result.status).json({ error: result.error });
        }

        res.cookie('authToken', result.token, { maxAge: TOKEN_LIFETIME, httpOnly: true, secure: true });
        res.status(statusCode).json({ data: result.user });
    }
}

export default new AuthController();
