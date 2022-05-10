import { createContext, FC, useCallback, useContext, useState } from 'react';
import { IWordsContext } from './WordsContext.types';

const WordsContext = createContext({} as IWordsContext);

export const useWordsContext = () => useContext(WordsContext);

export const WordsContextProvider: FC = (props) => {
    const [wordToDelete, setWordToDelete] = useState<string>('');
    const [wordInfo, setWordInfo] = useState<IWordsContext['wordInfo']>(null);
    const [isDeleteWordDialogOpened, setDeleteWordDialogOpened] = useState<boolean>(false);
    const [isWordFullInfoDialogOpened, setWordFullInfoDialogOpened] = useState<boolean>(false);
    const [showTranslation, setShowTranslation] = useState<boolean>(true);

    const openDeleteWordDialog = useCallback(() => setDeleteWordDialogOpened(true), []);

    const closeDeleteWordDialog = useCallback(() => setDeleteWordDialogOpened(false), []);

    const openWordFullInfoDialog = useCallback(() => setWordFullInfoDialogOpened(true), []);

    const closeWordFullInfoDialog = useCallback(() => setWordFullInfoDialogOpened(false), []);

    return (
        <WordsContext.Provider
            value={{
                wordToDelete,
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
            }}
        >
            {props.children}
        </WordsContext.Provider>
    );
};
