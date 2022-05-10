import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppContext } from 'context/AppContext';
import LanguageNotAddedError from 'errors/LanguageNotAddedError';
import { LoadingButton } from '@mui/lab';
import { DialogProps } from '../Dialog.types';

const AddDictionaryForm: FC<DialogProps> = (props) => {
    const { languages, addLanguage } = useAppContext();
    const [languageName, setLanguageName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { handleSubmit, clearErrors, control } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

    async function saveLanguage() {
        try {
            setLoading(true);
            await addLanguage(languageName);
        } catch (err) {
            if (err instanceof LanguageNotAddedError) {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }

        setLanguageName('');
        props.closeDialog();
    }

    function closeHandler() {
        setLanguageName('');
        clearErrors('language');
        props.closeDialog();
    }

    return (
        <Dialog open={props.isOpened} onClose={closeHandler}>
            <form onSubmit={handleSubmit(saveLanguage)}>
                <DialogTitle>Добавить новый язык</DialogTitle>
                <DialogContent>
                    <DialogContentText>Введите название нового языка</DialogContentText>
                    <Controller
                        name="language"
                        defaultValue=""
                        control={control}
                        rules={{
                            required: { value: true, message: 'Введите язык' },
                            minLength: { value: 2, message: 'Длина должна быть больше 1 символа' },
                            validate: (value: string) => {
                                if (languages.find(({ name }) => name === value)) return 'Такой язык уже добавлен';

                                return true;
                            },
                        }}
                        render={({ fieldState, field: { onChange } }) => (
                            <TextField
                                error={!!fieldState.error}
                                autoFocus
                                variant="standard"
                                fullWidth
                                margin="dense"
                                label="Язык"
                                helperText={fieldState.error?.message}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    onChange(e);
                                    setLanguageName(e.target.value);
                                }}
                                value={languageName}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <LoadingButton loading={loading} type="submit">
                        Добавить
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddDictionaryForm;
