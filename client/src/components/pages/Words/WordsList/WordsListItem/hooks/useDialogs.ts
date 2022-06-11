import { DialogNames } from 'components/dialogs/Dialog.types';
import { openDialog } from 'components/UI/CustomDialog/controllers';
import { useWordsStore } from 'context/StoreContext';
import { flushSync } from 'react-dom';
import { Word } from 'types/common';

function useDialogs(wordInfo: Word | null) {
    const { setWordToDelete, setWordInfo } = useWordsStore();

    function openWordFullInfoDialogHandler() {
        if (wordInfo !== null) {
            flushSync(() => setWordInfo(wordInfo));
            openDialog(DialogNames.SHOW_WORD_FULL_INFO_DIALOG);
        }
    }

    function openDeleteWordDialogHandler() {
        if (wordInfo !== null) {
            setWordToDelete(wordInfo);
            openDialog(DialogNames.DELETE_WORD_DIALOG);
        }
    }

    return { openWordFullInfoDialogHandler, openDeleteWordDialogHandler };
}

export default useDialogs;
