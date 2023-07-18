import React, { useCallback, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

export type BaseFormState = Record<PropertyKey, unknown>;
type ChangeHandlerEvent = React.ChangeEvent<{ value: unknown }> | SelectChangeEvent;

function useFormState<InitState extends BaseFormState>(getInitialState: () => InitState) {
    const [formState, setFormState] = useState(getInitialState());

    function changeHandler(key: keyof InitState, noEvent?: boolean) {
        return (eventOrValue: ChangeHandlerEvent | InitState[typeof key]) => {
            setFormState((prevState) => ({
                ...prevState,
                [key]: noEvent ? eventOrValue : (eventOrValue as ChangeHandlerEvent).target.value,
            }));
        };
    }

    const resetFormState = useCallback(
        (keys?: Array<keyof InitState>) => {
            if (keys === undefined) {
                setFormState(getInitialState());
            } else {
                setFormState((prevState) => {
                    const newState = { ...prevState };
                    const initState = getInitialState();

                    keys.forEach((key) => {
                        newState[key] = initState[key];
                    });

                    return newState;
                });
            }
        },
        [getInitialState]
    );

    return { formState, changeHandler, resetFormState, setFormState };
}

export default useFormState;
