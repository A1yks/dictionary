import { useAppContext } from 'context/AppContext';
import { useLearnContext } from 'context/LearnContext';
import { useWordsContext } from 'context/WordsContext';
import { useCallback, useEffect, useRef, useState } from 'react';

function useLeftPanel() {
    const { chosenLanguage } = useAppContext();
    const { openLearnWordsDialog, isLearnWordsDialogOpened } = useLearnContext();
    const { setShowTranslation, showTranslation } = useWordsContext();
    const [isAddWordDialogOpened, setAddWordDialogOpened] = useState<boolean>(false);
    const prevShowTranslationRef = useRef<boolean>(showTranslation);

    const openAddWordDialog = useCallback(() => {
        setAddWordDialogOpened(true);
    }, []);

    const closeAddWordDialog = useCallback(() => {
        setAddWordDialogOpened(false);
    }, []);

    const learnWords = useCallback(() => {
        prevShowTranslationRef.current = showTranslation;
        setShowTranslation(false);
        openLearnWordsDialog();
    }, [setShowTranslation, openLearnWordsDialog, showTranslation]);

    useEffect(() => {
        if (!isLearnWordsDialogOpened) {
            setShowTranslation(prevShowTranslationRef.current);
        }
    }, [isLearnWordsDialogOpened, setShowTranslation]);

    if (chosenLanguage === null) {
        throw new TypeError('chosenLanguage should not be null');
    }

    return { openAddWordDialog, closeAddWordDialog, chosenLanguage, learnWords, isAddWordDialogOpened };
}

export default useLeftPanel;
