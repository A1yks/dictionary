import { createContext, FC, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Word } from 'types/common';
import { IWordsContext } from './WordsContext.types';

const WordsContext = createContext({} as IWordsContext);

export const useWordsContext = () => useContext(WordsContext);

export const WordsContextProvider: FC = (props) => {
    const [wordInfo, setWordInfo] = useState<IWordsContext['wordInfo']>(null);
    const [isDeleteWordDialogOpened, setDeleteWordDialogOpened] = useState<boolean>(false);
    const [isWordFullInfoDialogOpened, setWordFullInfoDialogOpened] = useState<boolean>(false);
    const [showTranslation, setShowTranslation] = useState<boolean>(true);
    const wordToDeleteRef = useRef<Word | null>(null);

    const openDeleteWordDialog = useCallback(() => setDeleteWordDialogOpened(true), []);

    const closeDeleteWordDialog = useCallback(() => setDeleteWordDialogOpened(false), []);

    const openWordFullInfoDialog = useCallback(() => setWordFullInfoDialogOpened(true), []);

    const closeWordFullInfoDialog = useCallback(() => setWordFullInfoDialogOpened(false), []);

    const setWordToDelete = useCallback((word: Word) => (wordToDeleteRef.current = word), []);

    const contextValue = useMemo(
        () => ({
            wordToDeleteRef,
            wordInfo,
            isDeleteWordDialogOpened,
            isWordFullInfoDialogOpened,
            showTranslation,
            openDeleteWordDialog,
            closeDeleteWordDialog,
            setWordToDelete,
            setWordInfo,
            openWordFullInfoDialog,
            closeWordFullInfoDialog,
            setShowTranslation,
        }),
        [
            wordInfo,
            isDeleteWordDialogOpened,
            isWordFullInfoDialogOpened,
            showTranslation,
            openDeleteWordDialog,
            closeDeleteWordDialog,
            setWordToDelete,
            setWordInfo,
            openWordFullInfoDialog,
            closeWordFullInfoDialog,
            setShowTranslation,
        ]
    );

    return <WordsContext.Provider value={contextValue}>{props.children}</WordsContext.Provider>;
};
