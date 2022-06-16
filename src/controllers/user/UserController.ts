import UserService from '../../services/user/UserService';
import handleServiceResult from '../../utils/handleServiceResult';

class UserController {
    async getUser(req: Server.Request, res: Server.Response) {
        const userId = req.userId!;

        try {
            const result = await UserService.getUser(userId);

            handleServiceResult(result, res);
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при попытке найти пользователя' });
        }
    }
}

export default new UserController();
