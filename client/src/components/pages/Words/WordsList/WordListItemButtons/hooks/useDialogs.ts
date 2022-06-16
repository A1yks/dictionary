import { DialogNames } from 'components/dialogs/Dialog.types';
import { openDialog } from 'components/UI/CustomDialog/controllers';
import { useWordsStore } from 'context/StoreContext';
import { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { Word, WordInfo } from 'types/common';
import { isWord } from 'types/guards';

function useDialogs(word: Word | WordInfo | null) {
    const { setWordToDelete, setWordInfo } = useWordsStore();

    // function openWordFullInfoDialogHandler() {
    //     if (word !== null) {
    //         flushSync(() => setWordInfo(word));
    //         openDialog(DialogNames.SHOW_WORD_FULL_INFO_DIALOG);
    //     }
    // }

    // function openDeleteWordDialogHandler() {
    //     if (word !== null && isWord(word)) {
    //         setWordToDelete(word);
    //         openDialog(DialogNames.DELETE_WORD_DIALOG);
    //     }
    // }

    const openWordFullInfoDialogHandler = useCallback(() => {
        if (word !== null) {
            flushSync(() => setWordInfo(word));
            openDialog(DialogNames.SHOW_WORD_FULL_INFO_DIALOG);
        }
    }, [setWordInfo, word]);

    const openDeleteWordDialogHandler = useCallback(() => {
        if (word !== null && isWord(word)) {
            setWordToDelete(word);
            openDialog(DialogNames.DELETE_WORD_DIALOG);
        }
    }, [setWordToDelete, word]);

    return { openWordFullInfoDialogHandler, openDeleteWordDialogHandler };
}

export default useDialogs;
