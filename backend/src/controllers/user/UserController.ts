import errorsHandler from 'utils/errorsHandler/errorsHandler';
import UserService from '../../services/user/UserService';
import { ErrorTypes } from 'enums/errors';

class UserController {
    async getUser(req: Server.Request, res: Server.Response) {
        const userId = req.userId!;

        try {
            const result = await UserService.getUser(userId);

            res.status(200).json({ data: result });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'Произошла ошибка при попытке найти пользователя',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }
}

export default new UserController();
