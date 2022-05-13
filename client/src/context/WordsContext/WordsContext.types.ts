import React from 'react';
import { Word } from 'types/common';

export interface IWordsContext {
    wordToDeleteRef: React.MutableRefObject<Word | null>;
    wordInfo: Word | null;
    isDeleteWordDialogOpened: boolean;
    isWordFullInfoDialogOpened: boolean;
    showTranslation: boolean;
    openDeleteWordDialog: () => void;
    closeDeleteWordDialog: () => void;
    setWordToDelete: (word: Word) => void;
    setWordInfo: React.Dispatch<React.SetStateAction<Word | null>>;
    openWordFullInfoDialog: () => void;
    closeWordFullInfoDialog: () => void;
    setShowTranslation: React.Dispatch<React.SetStateAction<boolean>>;
}
