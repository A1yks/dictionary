import { FC, useCallback } from 'react';
import ConfirmationDialog from '../ConfirmationDialog';
import { useDictionariesStore, useLanguagesStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import { DialogNames } from '../Dialog.types';
import { closeDialogHandler } from 'components/UI/CustomDialog/controllers';

const DeleteLanguageDialog: FC = () => {
    const { workingLanguageId } = useDictionariesStore();
    const { loading, deleteLanguage } = useLanguagesStore();

    const submitHandler = useCallback(() => {
        deleteLanguage(workingLanguageId).then(closeDialogHandler(DialogNames.DELETE_LANGUAGE_DIALOG));
    }, [deleteLanguage, workingLanguageId]);

    return (
        <ConfirmationDialog
            id={DialogNames.DELETE_LANGUAGE_DIALOG}
            content="Вы действительно хотите удалить язык? Все слова также будут удалены."
            loading={loading}
            onConfirm={submitHandler}
        />
    );
};

export default observer(DeleteLanguageDialog);
