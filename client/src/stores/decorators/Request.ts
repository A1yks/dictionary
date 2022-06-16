import { IRequest } from 'stores/types';

function Request<T extends IRequest>(
    prototype: any,
    propName: string,
    descriptor: TypedPropertyDescriptor<(this: T, ...args: any[]) => Promise<any>>
) {
    const originalFunc = descriptor.value;

    descriptor.value = async function (...args) {
        this.setLoading(true);
        this.setError('');

        try {
            return await originalFunc?.apply(this, args);
        } catch (err) {
            if (typeof err === 'string') {
                this.setError(err);
                return;
                // throw new Error(err);
            }

            if (err instanceof Error) {
                this.setError(err.message);
                return;
                // throw new Error(err.message);
            }

            this.setError('Произошла неизвестная ошибка');
            // throw new Error('Произошла неизвестная ошибка');
        } finally {
            this.setLoading(false);
        }
    };
}

export default Request;
