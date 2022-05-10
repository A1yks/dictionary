export interface IDictionariesContext {
    workingLanguageId: string;
    isDeleteDialogOpened: boolean;
    isEditDialogOpened: boolean;
    setWorkingLanguageId: React.Dispatch<React.SetStateAction<string>>;
    openDeleteDialog: () => void;
    openEditDialog: () => void;
    closeDeleteDialog: () => void;
    closeEditDialog: () => void;
}
