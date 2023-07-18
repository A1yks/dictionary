import { useCallback, useState } from 'react';

type BooleanControlFn = () => void;

type UseBooleanControlReturnType = [
    state: boolean,
    setTrueFn: BooleanControlFn,
    setFalseFn: BooleanControlFn,
    toggleFn: BooleanControlFn
];

function useBooleanState(initialValue = false): UseBooleanControlReturnType {
    const [isTrue, setIsTrue] = useState(initialValue);

    const setTrue = useCallback(() => {
        setIsTrue(true);
    }, []);

    const setFalse = useCallback(() => {
        setIsTrue(false);
    }, []);

    const toggle = useCallback(() => {
        setIsTrue((prev) => !prev);
    }, []);

    return [isTrue, setTrue, setFalse, toggle];
}

export default useBooleanState;
