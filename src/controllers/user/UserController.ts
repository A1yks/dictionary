import UserService from '../../services/user/UserService';

class UserController {
    async getUser(req: Server.Request, res: Server.Response) {
        const userId = req.userId!;

        try {
            const user = await UserService.getUser(userId);

            if (!user) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }

            res.status(200).json({ data: user });
        } catch (err) {
            res.status(500).json({ error: 'Произошла ошибка при попытке найти пользователя' });
        }
    }
}

export default new UserController();
