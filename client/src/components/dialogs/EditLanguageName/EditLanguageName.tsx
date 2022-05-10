import { FC, useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Language } from 'types/common';
import { useAppContext } from 'context/AppContext';
import { useDictionariesContext } from 'context/DictionariesContext';
import LanguageEditError from 'errors/LanguageEditError';
import { LoadingButton } from '@mui/lab';

const EditLanguageName: FC = () => {
    const { editLanguage, languages } = useAppContext();
    const { workingLanguageId, isEditDialogOpened, closeEditDialog } = useDictionariesContext();
    const [languageName, setLanguageName] = useState<string>('');
    const { handleSubmit, clearErrors, control } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLanguageName('');
        closeEditDialog();
    }, [languages, closeEditDialog]);

    async function updateLanguage() {
        try {
            setLoading(true);
            await editLanguage(workingLanguageId, { name: languageName } as Language);
        } catch (err) {
            if (err instanceof LanguageEditError) {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    }

    function closeHandler() {
        clearErrors('edit-language');
        setLanguageName('');
        closeEditDialog();
    }

    return (
        <Dialog open={isEditDialogOpened} onClose={closeHandler}>
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
                        Сохранить
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditLanguageName;
