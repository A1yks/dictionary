import { FC } from 'react';
import ConfirmationDialog from '../ConfirmationDialog';
import { observer } from 'mobx-react-lite';
import { useLanguagesStore, useWordsStore } from 'context/StoreContext';
import { closeDialog } from 'components/UI/CustomDialog/controllers';
import { DialogNames } from '../Dialog.types';
import { useMutation } from 'react-query';
import WordsAPI from 'api/WordsAPI';
import { Word } from 'types/common';
import { DeleteWordsRes } from 'api/WordsAPI/types';

const DeleteWordConfirmationDialog: FC = () => {
    const languagesStore = useLanguagesStore();
    const wordsStore = useWordsStore();
    const { isLoading, mutateAsync } = useMutation<DeleteWordsRes, unknown, { dictId: string; words: Word[] }>({
        mutationFn: ({ dictId, words }) => WordsAPI.deleteWords(dictId, words),
    });

    async function confirmHandler() {
        const dictId = languagesStore.selectedLanguage?._id;
        const { wordToDeleteRef } = wordsStore;
        const wordToDelete = wordToDeleteRef.current;

        if (wordToDelete === null || dictId === undefined) return;

        const { wordsAmount, wordsToLearnAmount } = await mutateAsync({ dictId, words: [wordToDelete] });

        wordsStore.deleteWords([wordToDelete]);
        languagesStore.setWordsAmount(wordsAmount);
        languagesStore.setWordsToLearnAmount(wordsToLearnAmount);

        closeDialog(DialogNames.DELETE_WORD_DIALOG);
    }

    return (
        <ConfirmationDialog
            id={DialogNames.DELETE_WORD_DIALOG}
            content="Вы действительно хотите удалить данное слово?"
            onConfirm={confirmHandler}
            loading={isLoading}
        />
    );
};

export default observer(DeleteWordConfirmationDialog);
