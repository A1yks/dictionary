import { UseControllerProps } from 'react-hook-form';

export type AuthProps = {
    variant: 'login' | 'register';
};

export type FormRules = UseControllerProps['rules'];

export enum InputNames {
    LOGIN = 'login',
    PASSWORD = 'password',
    CONF_PASSWORD = 'confPassword',
}
