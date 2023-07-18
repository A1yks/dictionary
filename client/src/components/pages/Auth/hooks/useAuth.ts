import { useAuthStore, useUserStore } from 'context/StoreContext';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AuthProps, FormRules, InputNames } from '../Auth.types';
import { extractError } from 'utils/extractError';
import { useLoginMutation, useRegisterMutation } from 'api/AuthAPI/AuthAPI';
import useErrorsHandler from 'hooks/useErrorsHandler';

function useAuth(variant: AuthProps['variant']) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmationPassword, setConfirmationPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorAlertOpened, setErrorAlertOpened] = useState<boolean>(false);
    const { control, handleSubmit, reset } = useForm();
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const { isLoggedIn } = authStore;
    const {
        isLoading: isLogginIn,
        error: loginError,
        mutateAsync: loginMutation,
    } = useLoginMutation({
        onSuccess(user) {
            userStore.setUser(user);
        },
    });
    const {
        isLoading: isRegistering,
        error: registrationError,
        mutateAsync: registerMutation,
    } = useRegisterMutation({
        onSuccess(user) {
            userStore.setUser(user);
        },
    });
    const navigate = useNavigate();
    const error = extractError(loginError || registrationError);
    const loading = isLogginIn || isRegistering;

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

    const sendForm = useErrorsHandler(async () => {
        if (variant === 'register') {
            await registerMutation({ login, passwords: [password, confirmationPassword] });
        } else {
            await loginMutation({ login, password });
        }
    });

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
    }, [variant, reset]);

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
