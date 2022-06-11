import { FC, useState } from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useDictionariesStore, useLanguagesStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import { CustomDialog } from 'components/UI/CustomDialog';
import { DialogNames } from '../Dialog.types';
import { closeDialog } from 'components/UI/CustomDialog/controllers';

const EditLanguageNameDialog: FC = () => {
    const { workingLanguageId } = useDictionariesStore();
    const [languageName, setLanguageName] = useState<string>('');
    const { handleSubmit, clearErrors, control, setError, setValue } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const { loading, editLanguageName, languages } = useLanguagesStore();

    async function updateLanguage() {
        editLanguageName(workingLanguageId, languageName)
            .then(closeHandler)
            .catch((err: Error) => {
                setError('edit-language', { message: err.message });
            });
    }

    function closeHandler() {
        setLanguageName('');
        setValue('edit-language', '');
        clearErrors('edit-language');
        closeDialog(DialogNames.EDIT_LANGUAGE_NAME_DIALOG);
    }

    return (
        <CustomDialog id={DialogNames.EDIT_LANGUAGE_NAME_DIALOG} onClose={closeHandler}>
            <form onSubmit={handleSubmit(updateLanguage)}>
                <DialogTitle>Редактировать название языка</DialogTitle>
                <DialogContent>
                    <DialogContentText>Введите новое название языка</DialogContentText>
                    <Controller
                        name="edit-language"
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
                        Сохранить
                    </LoadingButton>
                </DialogActions>
            </form>
        </CustomDialog>
    );
};

export default observer(EditLanguageNameDialog);
