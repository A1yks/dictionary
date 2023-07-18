import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { WordInfo } from 'types/common';
import { LoadingButton } from '@mui/lab';
import WordsListItem from 'components/pages/Words/WordsList/WordsListItem';
import { DialogNames } from '../Dialog.types';
import WordsAPI from 'api/WordsAPI';
import { useLanguagesStore, useWordsStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import { CustomDialog } from 'components/UI/CustomDialog';
import { closeDialog } from 'components/UI/CustomDialog/controllers';
import { useMutation, useQuery } from 'react-query';
import useDebounce from 'hooks/useDebounce';

const AddWordDialog: FC = () => {
    const languagesStore = useLanguagesStore();
    const wordsStore = useWordsStore();
    const { handleSubmit, clearErrors, resetField, control, trigger, setError } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const [wordInfo, setWordInfo] = useState<WordInfo | null>(null);
    const [word, setWord] = useState<string>('');
    const wordText = useDebounce(word, 500);
    console.log(wordText);
    const { isFetching: isWordLoading } = useQuery({
        queryKey: ['word', wordText],
        queryFn: () => WordsAPI.translateWord(wordText),
        onSuccess: setWordInfo,
        onError() {
            setWordInfo(null);
        },
        enabled: wordText.trim() !== '',
    });
    const { isLoading: isAddingWord, mutateAsync } = useMutation({
        mutationFn: () => WordsAPI.addWord(languagesStore.selectedLanguage!._id, wordInfo!),
        onSuccess(word) {
            wordsStore.addWord(word);
            closeHandler();
        },
        onError(err) {
            if (err instanceof Error) {
                setError('add-word', { message: err.message });
            }
        },
    });

    function closeHandler() {
        setWord('');
        setWordInfo(null);
        resetField('add-word');
        clearErrors('add-word');
        closeDialog(DialogNames.ADD_WORD_DIALOG);
    }

    async function submitHandler() {
        await mutateAsync();
    }

    useEffect(() => {
        if (wordText.trim() === '') {
            setWordInfo(null);
        }
    }, [wordText]);

    useEffect(() => {
        if (!isWordLoading) {
            trigger('add-word');
        }
    }, [isWordLoading, trigger]);

    return (
        <CustomDialog id={DialogNames.ADD_WORD_DIALOG} onClose={closeHandler}>
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
                            validate() {
                                if (isWordLoading) return 'Перевод слова еще загружается';

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
                    <WordsListItem wordInfo={wordInfo} loading={isWordLoading} showTranslation={true} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHandler}>Отмена</Button>
                    <LoadingButton loading={isAddingWord} type="submit">
                        Добавить
                    </LoadingButton>
                </DialogActions>
            </form>
        </CustomDialog>
    );
};

export default observer(AddWordDialog);
