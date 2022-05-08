import React, { createContext, FC, useCallback, useContext, useState } from 'react';
import { Word } from '../types/common';

interface IWordsContext {
	wordToDelete: string;
	wordInfo: Word | null;
	isDeleteWordDialogOpened: boolean;
	isWordFullInfoDialogOpened: boolean;
	openDeleteWordDialog: () => void;
	closeDeleteWordDialog: () => void;
	setWordToDelete: React.Dispatch<React.SetStateAction<string>>;
	setWordInfo: React.Dispatch<React.SetStateAction<Word | null>>;
	openWordFullInfoDialog: () => void;
	closeWordFullInfoDialog: () => void;
}

const WordsContext = createContext({} as IWordsContext);

export const useWordsContext = () => useContext(WordsContext);

export const WordsContextProvider: FC<{}> = (props) => {
	const [wordToDelete, setWordToDelete] = useState<string>('');
	const [wordInfo, setWordInfo] = useState<Word | null>(null);
	const [isDeleteWordDialogOpened, setDeleteWordDialogOpened] = useState<boolean>(false);
	const [isWordFullInfoDialogOpened, setWordFullInfoDialogOpened] = useState<boolean>(false);

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
				openDeleteWordDialog,
				closeDeleteWordDialog,
				setWordToDelete,
				setWordInfo,
				openWordFullInfoDialog,
				closeWordFullInfoDialog,
			}}
		>
			{props.children}
		</WordsContext.Provider>
	);
};
