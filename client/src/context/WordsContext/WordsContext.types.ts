import React from 'react';
import { Word } from 'types/common';

export interface IWordsContext {
    wordToDelete: string;
    wordInfo: Word | null;
    isDeleteWordDialogOpened: boolean;
    isWordFullInfoDialogOpened: boolean;
    showTranslation: boolean;
    openDeleteWordDialog: () => void;
    closeDeleteWordDialog: () => void;
    setWordToDelete: React.Dispatch<React.SetStateAction<string>>;
    setWordInfo: React.Dispatch<React.SetStateAction<Word | null>>;
    openWordFullInfoDialog: () => void;
    closeWordFullInfoDialog: () => void;
    setShowTranslation: React.Dispatch<React.SetStateAction<boolean>>;
}
