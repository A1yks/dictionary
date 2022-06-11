import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Word } from 'types/common';
import { LoadingButton } from '@mui/lab';
import WordsListItem from 'components/pages/Words/WordsList/WordsListItem';
import { DialogNames } from '../Dialog.types';
import WordsAPI from 'api/WordsAPI';
import { useWordsStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import { CustomDialog } from 'components/UI/CustomDialog';
import { closeDialog } from 'components/UI/CustomDialog/controllers';

const AddWordDialog: FC = () => {
    const { addWord, loading } = useWordsStore();
    const { handleSubmit, clearErrors, resetField, control, trigger } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const [wordLoading, setWordLoading] = useState<boolean>(false);
    const [wordInfo, setWordInfo] = useState<Word | null>(null);
    const [word, setWord] = useState<string>('');

    function closeHandler() {
        setWord('');
        setWordInfo(null);
        resetField('add-word');
        clearErrors('add-word');
        closeDialog(DialogNames.ADD_WORD_DIALOG);
    }

    async function submitHandler() {
        if (wordInfo === null) return;

        await addWord(wordInfo);
        closeHandler();
    }

    async function searchWord(word: string) {
        try {
            setWordLoading(true);

            const wordInfo = await WordsAPI.translateWord(word);

            setWordInfo(wordInfo);
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
        <CustomDialog id={DialogNames.ADD_WORD_DIALOG}>
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
        </CustomDialog>
    );
};

export default observer(AddWordDialog);
