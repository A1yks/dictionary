import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Word } from 'types/common';
import { LoadingButton } from '@mui/lab';
import { useAppContext } from 'context/AppContext';
import WordAdditionError from 'errors/WordAdditionError';
import WordsListItem from 'components/pages/Words/WordsList/WordsListItem';
import { DialogProps } from '../Dialog.types';
import React from 'react';
import API from 'utils/api';

const AddWordDialog: FC<DialogProps> = (props) => {
    const context = useAppContext();
    const { handleSubmit, clearErrors, resetField, control, trigger } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const [wordLoading, setWordLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [wordInfo, setWordInfo] = useState<Word | null>(null);
    const [word, setWord] = useState<string>('');
    const { addWord } = context;
    const chosenLanguage = context.chosenLanguage!;

    function closeHandler() {
        setWord('');
        setWordInfo(null);
        resetField('add-word');
        clearErrors('add-word');
        props.closeDialog();
    }

    async function submitHandler() {
        if (wordInfo === null) return;

        try {
            setLoading(true);
            await addWord(chosenLanguage.id, wordInfo);
        } catch (err) {
            if (err instanceof WordAdditionError) {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }

        closeHandler();
    }

    async function searchWord(word: string) {
        try {
            setWordLoading(true);

            const result = await API<Word>(`/words/search/${encodeURIComponent(word.trim())}`);

            setWordInfo(result.data);
        } catch (err) {
            setWordInfo(null);
            console.error(err);
        } finally {
            setWordLoading(false);
        }
    }

    useEffect(() => {
        if (!wordLoading) {
            trigger('add-word');
        }
    }, [wordLoading, trigger]);

    useEffect(() => {
        if (word !== '') {
            const timer = setTimeout(() => {
                searchWord(word);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [word]);

    return (
        <Dialog open={props.isOpened} onClose={closeHandler}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <DialogTitle>Добавить слово</DialogTitle>
                <DialogContent>
                    <DialogContentText>Начните вводить слово, которое хотите добавить</DialogContentText>
                    <Controller
                        name="add-word"
                        defaultValue=""
                        control={control}
                        rules={{
                            required: { value: true, message: 'Введите слово' },
                            validate: () => {
                                if (wordLoading) return 'Перевод слова еще загружается';

                                if (wordInfo === null) return 'Перевод для введенного слова отсутствует';

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
                                label="Слово"
                                helperText={fieldState.error?.message}
                                onChange={(e) => {
                                    onChange(e);
                                    setWord(e.target.value);
                                }}
                                value={word}
                            />
                        )}
                    />
                    <WordsListItem wordInfo={wordInfo} loading={wordLoading} showTranslation={true} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHandler}>Отмена</Button>
                    <LoadingButton loading={loading} type="submit">
                        Добавить
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default React.memo(AddWordDialog);
