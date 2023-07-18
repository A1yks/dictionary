import errorsHandler, { Configuration } from './errorsHandler';

function handleServerErrors<Body = unknown, Params = unknown, QueryParams = unknown>(
    callback: (req: Server.Request<Body, Params, QueryParams>, res: Server.Response) => unknown,
    config?: Omit<Configuration, 'res'>
) {
    return async (req: Server.Request<Body, Params, QueryParams>, res: Server.Response) => {
        try {
            await callback(req, res);
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'Произошла непредвиденная ошибка при попытке выполнить операцию',
                ...config,
            });
        }
    };
}

export default handleServerErrors;
