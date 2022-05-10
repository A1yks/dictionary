import { DialogProps } from '../Dialog.types';

export type ConfirmationDialogProps = {
    loading?: boolean;
    title?: string;
    content: string;
    onConfirm: () => void;
} & DialogProps;
