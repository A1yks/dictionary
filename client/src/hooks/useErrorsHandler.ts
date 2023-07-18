import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { extractError } from '../utils/extractError';
import useEvent from './useEvent';

type CallbackType = (...args: any[]) => MaybePromise<void>;

const isDev = process.env.NODE_ENV !== 'production';

function useErrorsHandler<T extends CallbackType>(callback: T, log = isDev) {
    const { enqueueSnackbar } = useSnackbar();
    const memoizedCallback = useEvent(callback);

    return useCallback(
        async (...args: any[]) => {
            try {
                await memoizedCallback(...args);
            } catch (err) {
                if (log) {
                    console.error(err);
                }

                enqueueSnackbar(extractError(err), { variant: 'error' });
            }
        },
        [enqueueSnackbar, log, memoizedCallback]
    ) as T;
}

export default useErrorsHandler;
