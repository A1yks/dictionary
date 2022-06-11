import { FC } from 'react';
import ConfirmationDialog from '../ConfirmationDialog';
import { observer } from 'mobx-react-lite';
import { useWordsStore } from 'context/StoreContext';
import { closeDialog } from 'components/UI/CustomDialog/controllers';
import { DialogNames } from '../Dialog.types';

const DeleteWordConfirmationDialog: FC = () => {
    const { deleteWords, loading, wordToDeleteRef } = useWordsStore();

    async function confirmHandler() {
        if (wordToDeleteRef.current === null) return;

        await deleteWords([wordToDeleteRef.current]);
        closeDialog(DialogNames.DELETE_WORD_DIALOG);
    }

    return (
        <ConfirmationDialog
            id={DialogNames.DELETE_WORD_DIALOG}
            content="Вы действительно хотите удалить данное слово?"
            onConfirm={confirmHandler}
            loading={loading}
        />
    );
};

export default observer(DeleteWordConfirmationDialog);
