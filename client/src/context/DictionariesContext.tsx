import React, { createContext, FC, useCallback, useContext, useState } from 'react';

interface IDictionariesContext {
	workingLanguageId: string;
	isDeleteDialogOpened: boolean;
	isEditDialogOpened: boolean;
	setWorkingLanguageId: React.Dispatch<React.SetStateAction<string>>;
	openDeleteDialog: () => void;
	openEditDialog: () => void;
	closeDeleteDialog: () => void;
	closeEditDialog: () => void;
}

const DictionariesContext = createContext({} as IDictionariesContext);

export const useDictionariesContext = () => useContext(DictionariesContext);

export const DictionariesContextProvider: FC<{}> = (props) => {
	const [workingLanguageId, setWorkingLanguageId] = useState<string>('');
	const [isDeleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
	const [isEditDialogOpened, setEditDialogOpened] = useState<boolean>(false);

	const openDeleteDialog = useCallback(() => setDeleteDialogOpened(true), []);

	const openEditDialog = useCallback(() => setEditDialogOpened(true), []);

	const closeDeleteDialog = useCallback(() => setDeleteDialogOpened(false), []);

	const closeEditDialog = useCallback(() => setEditDialogOpened(false), []);

	return (
		<DictionariesContext.Provider
			value={{
				workingLanguageId,
				isDeleteDialogOpened,
				isEditDialogOpened,
				setWorkingLanguageId,
				openDeleteDialog,
				openEditDialog,
				closeDeleteDialog,
				closeEditDialog,
			}}
		>
			{props.children}
		</DictionariesContext.Provider>
	);
};
