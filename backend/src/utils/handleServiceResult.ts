import { isServiceError } from '../types/guards';

function handleServiceResult(result: Service.Error | unknown, serverResponse: Server.Response, sucessStatusCode = 200) {
    if (isServiceError(result)) {
        return serverResponse.status(result.status).json({ error: result.error });
    }

    serverResponse.status(sucessStatusCode).json({ data: result });
}

export default handleServiceResult;
