import { createContext, FC, useCallback, useContext, useState } from 'react';

interface ILearnContext {
	isLearnWordsDialogOpened: boolean;
	openLearnWordsDialog: () => void;
	closeLearnWordsDialog: () => void;
}

const LearnContext = createContext({} as ILearnContext);

export const useLearnContext = () => useContext(LearnContext);

export const LearnContextProvider: FC<{}> = (props) => {
	const [isLearnWordsDialogOpened, setLearnWordsDialogOpened] = useState<boolean>(false);

	const openLearnWordsDialog = useCallback(() => setLearnWordsDialogOpened(true), []);

	const closeLearnWordsDialog = useCallback(() => setLearnWordsDialogOpened(false), []);

	return (
		<LearnContext.Provider value={{ isLearnWordsDialogOpened, openLearnWordsDialog, closeLearnWordsDialog }}>
			{props.children}
		</LearnContext.Provider>
	);
};
