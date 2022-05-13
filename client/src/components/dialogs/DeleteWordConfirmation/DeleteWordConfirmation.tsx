import { FC, useState } from 'react';
import { useAppContext } from 'context/AppContext';
import { useWordsContext } from 'context/WordsContext';
import WordDeletionError from 'errors/WordDeletionError';
import ConfirmationDialog from '../ConfirmationDialog';

const DeleteWordConfirmation: FC = () => {
    const context = useAppContext();
    const { deleteWords } = context;
    const { isDeleteWordDialogOpened, closeDeleteWordDialog, wordToDeleteRef } = useWordsContext();
    const [loading, setLoading] = useState<boolean>(false);
    const chosenLanguage = context.chosenLanguage!;

    async function confirmHandler() {
        if (wordToDeleteRef.current === null) return;

        try {
            setLoading(true);
            await deleteWords(chosenLanguage.id, [wordToDeleteRef.current]);
        } catch (err) {
            if (err instanceof WordDeletionError) {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }

        closeDeleteWordDialog();
    }

    return (
        <ConfirmationDialog
            isOpened={isDeleteWordDialogOpened}
            content="Вы действительно хотите удалить данное слово?"
            closeDialog={closeDeleteWordDialog}
            onConfirm={confirmHandler}
            loading={loading}
        />
    );
};

export default DeleteWordConfirmation;
