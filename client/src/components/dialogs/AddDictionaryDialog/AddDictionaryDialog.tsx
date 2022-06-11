import React, { FC } from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { DialogNames } from '../Dialog.types';
import { useLanguagesStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import { CustomDialog } from 'components/UI/CustomDialog';
import { closeDialog } from 'components/UI/CustomDialog/controllers';

const AddDictionaryDialog: FC = () => {
    const [languageName, setLanguageName] = useState<string>('');
    const { handleSubmit, clearErrors, control, setError, setValue } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const { languages, loading, addLanguage } = useLanguagesStore();

    function saveLanguage() {
        addLanguage(languageName)
            .then(closeHandler)
            .catch((err: Error) => setError('language', { message: err.message }));
    }

    function closeHandler() {
        setLanguageName('');
        setValue('language', '');
        clearErrors('language');
        closeDialog(DialogNames.ADD_DICTIONARY_DIALOG);
    }

    return (
        <CustomDialog id={DialogNames.ADD_DICTIONARY_DIALOG} onClose={closeHandler}>
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
                            validate: (value: string) => {
                                if (value.trim().length < 3) return 'Длина должна быть больше 2-х символов';

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
        </CustomDialog>
    );
};

export default observer(AddDictionaryDialog);
