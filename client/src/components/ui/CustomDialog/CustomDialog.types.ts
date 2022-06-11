import { DialogProps } from '@mui/material';
import { ReactNode } from 'react';

export type CustomDialogId = PropertyKey;

export type DialogsCollection = {
    [key: CustomDialogId]: {
        opened: boolean;
    };
} & Object;

export type CustomDialogProps = {
    children: ReactNode;
    id: CustomDialogId;
    onClose?: () => void;
} & Omit<DialogProps, 'open' | 'id' | 'onClose'>;
