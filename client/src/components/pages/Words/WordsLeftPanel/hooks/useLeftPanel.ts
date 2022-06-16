import { DialogNames } from 'components/dialogs/Dialog.types';
import { dialogs, openDialog } from 'components/UI/CustomDialog/controllers';
import { useLanguagesStore, useWordsStore } from 'context/StoreContext';
import { useCallback, useEffect, useRef } from 'react';

function useLeftPanel() {
    const { selectedLanguage } = useLanguagesStore();
    const { setShowTranslation, showTranslation, wordsToLearn } = useWordsStore();
    const prevShowTranslationRef = useRef<boolean>(showTranslation);
    const isLearnWordsDialogOpened = dialogs[DialogNames.LEARN_WORDS_DIALOG]?.opened;

    const learnWords = useCallback(() => {
        prevShowTranslationRef.current = showTranslation;
        setShowTranslation(false);
        openDialog(DialogNames.LEARN_WORDS_DIALOG);
    }, [setShowTranslation, showTranslation]);

    useEffect(() => {
        if (!isLearnWordsDialogOpened) {
            setShowTranslation(prevShowTranslationRef.current);
        }
    }, [isLearnWordsDialogOpened, setShowTranslation]);

    if (selectedLanguage === null) {
        throw new TypeError('selectedLanguage should not be null');
    }

    return { selectedLanguage, wordsToLearn, learnWords };
}

export default useLeftPanel;
