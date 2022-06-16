import { useAuthStore } from 'context/StoreContext';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AuthProps, FormRules, InputNames } from '../Auth.types';

function useAuth(variant: AuthProps['variant']) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmationPassword, setConfirmationPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorAlertOpened, setErrorAlertOpened] = useState<boolean>(false);
    const { control, handleSubmit, reset } = useForm();
    const authStore = useAuthStore();
    const { loading, error, setError, isLoggedIn } = authStore;
    const navigate = useNavigate();

    const loginRules: FormRules = {
        required: { value: true, message: 'Введите логин' },
        validate(value: string) {
            if (value.trim() === '') return 'Введите логин';

            return true;
        },
    };

    const passwordRules: FormRules = {
        required: { value: true, message: 'Введите пароль' },
        minLength: { value: 6, message: 'Минимальная длина пароля - 6 символов' },
    };

    const confPasswordRules: FormRules = {
        required: { value: true, message: 'Подтвердите пароль' },
        validate(value: string) {
            if (value !== password) return 'Пароли не совпадают';

            return true;
        },
    };

    async function sendForm() {
        if (variant === 'register') {
            await authStore.register(login, [password, confirmationPassword]);
        } else {
            await authStore.login(login, password);
        }
    }

    function toggleShowPassword() {
        setShowPassword((show) => !show);
    }

    function closeErrorAlert() {
        setErrorAlertOpened(false);
    }

    useEffect(() => {
        setLogin('');
        setPassword('');
        setConfirmationPassword('');
        setShowPassword(false);
        setErrorAlertOpened(false);
        reset({
            [InputNames.LOGIN]: '',
            [InputNames.PASSWORD]: '',
            [InputNames.CONF_PASSWORD]: '',
        });
    }, [variant, reset, setError]);

    useEffect(() => {
        if (error === '') {
            setErrorAlertOpened(false);
        } else {
            setErrorAlertOpened(true);
        }
    }, [error]);

    useEffect(() => {
        if (isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return {
        login,
        password,
        confirmationPassword,
        control,
        loginRules,
        passwordRules,
        confPasswordRules,
        showPassword,
        loading,
        error,
        errorAlertOpened,
        handleSubmit,
        setLogin,
        setPassword,
        setConfirmationPassword,
        sendForm,
        toggleShowPassword,
        closeErrorAlert,
    };
}

export default useAuth;
