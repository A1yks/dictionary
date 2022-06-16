import { IRequest } from 'stores/types';

type RequestArgs<T> = DecoratorArgs<T> | [throwErrors: boolean];
type DecoratorArgs<T> = [prototype: any, propName: string, descriptor: TypedPropertyDescriptor<(this: T, ...args: any[]) => Promise<any>>];

function Request(throwErrors: boolean): typeof decorator;
function Request<T extends IRequest>(...args: RequestArgs<T>): void;
function Request<T extends IRequest>(...args: RequestArgs<T>) {
    if (typeof args[0] === 'boolean') {
        return function (...decoratorArgs: DecoratorArgs<T>) {
            decorator(...decoratorArgs, true);
        };
    }

    // @ts-ignore
    decorator(...args);
}

function decorator<T extends IRequest>(
    prototype: any,
    propName: string,
    descriptor: TypedPropertyDescriptor<(this: T, ...args: any[]) => Promise<any>>,
    throwErrors = false
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

                if (throwErrors) {
                    throw new Error(err);
                }

                return;
            }

            if (err instanceof Error) {
                this.setError(err.message);

                if (throwErrors) {
                    throw new Error(err.message);
                }

                return;
            }

            const unknownError = 'Произошла неизвестная ошибка';

            this.setError(unknownError);

            if (throwErrors) {
                throw new Error(unknownError);
            }
        } finally {
            this.setLoading(false);
        }
    };
}

export default Request;
