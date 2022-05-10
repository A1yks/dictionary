import { FC, useState } from 'react';
import { useAppContext } from 'context/AppContext';
import { useDictionariesContext } from 'context/DictionariesContext';
import LanguageNotDeletedError from 'errors/LanguageNotDeletedError';
import ConfirmationDialog from '../ConfirmationDialog';

const DeleteConfirmation: FC = () => {
    const { deleteLanguage } = useAppContext();
    const { workingLanguageId, isDeleteDialogOpened, closeDeleteDialog } = useDictionariesContext();
    const [loading, setLoading] = useState<boolean>(false);

    async function submitHandler() {
        try {
            setLoading(true);
            await deleteLanguage(workingLanguageId);
        } catch (err) {
            if (err instanceof LanguageNotDeletedError) {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }

        closeDeleteDialog();
    }

    return (
        <ConfirmationDialog
            content="Вы действительно хотите удалить язык? Все слова также будут удалены."
            loading={loading}
            isOpened={isDeleteDialogOpened}
            onConfirm={submitHandler}
            closeDialog={closeDeleteDialog}
        />
    );
};

export default DeleteConfirmation;
