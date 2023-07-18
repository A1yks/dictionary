import { ErrorTypes } from 'enums/errors';
import logger from '../logger';

type ErrorConstructor = Partial<typeof Error> & {
    [x: string]: any;
};

export type Configuration = {
    /**
     * Unexpected error message.
     *
     * Error is considered to be unexpected if `configuration.expectedErrors` is not specified
     * (it means that all errors are unexpected).
     */
    unexpectedErrMsg?: string;
    /**
     * Unexpected error http status code. Default code is 500.
     */
    unexpectedErrStatusCode?: number;
    /**
     * Common http status code for both types of errors. Default code is 500.
     */
    statusCode?: number;
    /**
     * Arrays of expected errors. Each element of this array contains another array with following elements:
     * - Error type or error class;
     * - Status code. If not specified, `configuration.statusCode` is used;
     * - Error message. If not specified, `err.message` is used.
     */
    expectedErrors?: [type: ErrorTypes | ErrorConstructor, statusCode?: number, errMsg?: string][];
    /**
     * Determines whether errors should be outputed to the logger. Default is true.
     */
    log?: boolean;
    /**
     * Express's `res` object which is used to send errors to the client.
     */
    res: Server.Response;
};

const DEFAULT_ERR_MSG = 'An error occured while perfoming the operation';
const defaultConfig: Partial<Configuration> = {
    statusCode: 500,
    unexpectedErrMsg: DEFAULT_ERR_MSG,
    expectedErrors: [
        [ErrorTypes.NOT_FOUND, 404],
        [ErrorTypes.BAD_DATA, 400],
        [ErrorTypes.ALREADY_EXISTS, 409],
        [ErrorTypes.NO_PERMISSIONS, 403],
    ],
    log: true,
};

/**
 * Handles errors
 * @param err Error to handle
 * @param configuration Configuration object
 */
function errorsHandler(err: unknown, configuration: Configuration) {
    const config = { ...defaultConfig, ...configuration } as Required<Configuration>;

    config.expectedErrors = defaultConfig.expectedErrors!.map((err) => {
        const [type] = err;

        configuration.expectedErrors?.forEach((providedErr) => {
            const [errType] = providedErr;

            if (errType === type) {
                err[1] = providedErr[1];
                err[2] = providedErr[2];
            }
        });

        return err;
    });

    if (config.log) {
        logger.error(err);
    }

    if (err instanceof Error) {
        if (config.unexpectedErrStatusCode === undefined) {
            config.unexpectedErrStatusCode = config.statusCode;
        }

        if (config.expectedErrors !== undefined) {
            for (const [type, statusCode = config.statusCode, errMsg = err.message] of config.expectedErrors) {
                if (type === (err.cause as ErrorTypes) || (typeof type === 'function' && err instanceof (type as typeof Error))) {
                    config.res.status(statusCode).json({ error: errMsg });
                    return;
                }
            }
        }

        config.res.status(config.unexpectedErrStatusCode).json({ error: config.unexpectedErrMsg });
    }
}

export default errorsHandler;
