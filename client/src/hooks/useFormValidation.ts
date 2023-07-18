import Joi from 'joi';
import { FieldValues, useForm, DeepPartial } from 'react-hook-form';
import useEvent from './useEvent';
import useErrorsHandler from './useErrorsHandler';
import joiResolver from 'utils/joiResolver';

type BaseHookFormConfig = Parameters<typeof useForm>[0];
type HookFormConfig<T extends FieldValues> = Omit<BaseHookFormConfig, 'defaultValues'> & {
    defaultValues?: DeepPartial<T>;
    resetValuesAfterSubmit?: boolean;
};
type CallbackType<FormState extends FieldValues = FieldValues> = (
    formControls: Omit<ReturnType<typeof useForm<FormState>>, 'handleSubmit'>,
    ...args: unknown[]
) => MaybePromise<void>;

function useFormValidation<FormState extends FieldValues, T extends CallbackType<FormState> = CallbackType<FormState>>(
    schema: Joi.Schema<FormState>,
    callback: T,
    hookFormConfig?: HookFormConfig<FormState>
) {
    const defaultConfig: BaseHookFormConfig = {
        mode: 'onSubmit',
        resolver: joiResolver(schema),
    };
    const config = { ...defaultConfig, ...hookFormConfig } as HookFormConfig<FormState>;

    const { handleSubmit, ...formValues } = useForm<FormState>(config);

    const submit = useErrorsHandler(async () => {
        await callback(formValues);

        if (config.resetValuesAfterSubmit) {
            formValues.reset();
        }
    });
    const submitHandler = useEvent(handleSubmit(submit));

    return { ...formValues, submitHandler };
}

export default useFormValidation;
