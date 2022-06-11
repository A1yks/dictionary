import { CustomDialogId } from 'components/UI/CustomDialog/CustomDialog.types';

export type ConfirmationDialogProps = {
    loading?: boolean;
    title?: string;
    content: string;
    id: CustomDialogId;
    onConfirm: () => void;
    onClose?: () => void;
};
