import {
    Alert,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Link,
    Paper,
    Snackbar,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import useAuth from './hooks/useAuth';
import styles from './Auth.module.scss';
import { AuthProps, InputNames } from './Auth.types';
import { Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { observer } from 'mobx-react-lite';

const Auth: FC<AuthProps> = (props) => {
    const {
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
    } = useAuth(props.variant);
    const isRegister = props.variant === 'register';

    return (
        <Container maxWidth="sm" className={styles.container}>
            <Paper variant="outlined" component="form" className={styles.form} onSubmit={handleSubmit(sendForm)}>
                <Grid container direction="column" alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography component="p" variant="h6">
                            {isRegister ? 'Регистрация' : 'Авторизация'}
                        </Typography>
                    </Grid>
                    <Grid item width="100%">
                        <Controller
                            name={InputNames.LOGIN}
                            defaultValue=""
                            control={control}
                            rules={loginRules}
                            render={({ fieldState, field: { onChange } }) => (
                                <TextField
                                    error={!!fieldState.error}
                                    variant="standard"
                                    fullWidth
                                    label="Имя пользователя"
                                    helperText={fieldState.error?.message}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        onChange(e);
                                        setLogin(e.target.value);
                                    }}
                                    value={login}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item width="100%">
                        <Controller
                            name={InputNames.PASSWORD}
                            defaultValue=""
                            control={control}
                            rules={passwordRules}
                            render={({ fieldState, field: { onChange } }) => (
                                <FormControl variant="standard" error={!!fieldState.error} fullWidth>
                                    <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            onChange(e);
                                            setPassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <Tooltip title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}>
                                                    <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} size="small">
                                                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    {isRegister && (
                        <Grid item width="100%">
                            <Controller
                                name={InputNames.CONF_PASSWORD}
                                defaultValue=""
                                control={control}
                                rules={confPasswordRules}
                                render={({ fieldState, field: { onChange } }) => (
                                    <TextField
                                        error={!!fieldState.error}
                                        variant="standard"
                                        fullWidth
                                        label="Подтверждение пароля"
                                        helperText={fieldState.error?.message}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            onChange(e);
                                            setConfirmationPassword(e.target.value);
                                        }}
                                        value={confirmationPassword}
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                )}
                            />
                        </Grid>
                    )}
                    <Grid item width="100%">
                        <LoadingButton variant="contained" fullWidth type="submit" className={styles.loginBtn} loading={loading}>
                            {isRegister ? 'Зарегистрироваться' : 'Войти'}
                        </LoadingButton>
                    </Grid>
                    <Grid item mt={1}>
                        {isRegister ? (
                            <Typography component="p" fontSize={14}>
                                Уже есть аккаунт?{' '}
                                <Link component={RouterLink} to="/login" underline="hover">
                                    Войти
                                </Link>
                            </Typography>
                        ) : (
                            <Typography component="p" fontSize={14}>
                                Нет аккаунта?{' '}
                                <Link component={RouterLink} to="/register" underline="hover">
                                    Зарегистрироваться
                                </Link>
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar open={errorAlertOpened} autoHideDuration={5000} onClose={closeErrorAlert}>
                <Alert onClose={closeErrorAlert} severity="error" sx={{ width: '100%' }} variant="filled">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default observer(Auth);
