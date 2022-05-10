import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FC } from 'react';
import { ConfirmationDialogProps } from './ConfirmationDialog.types';

const ConfirmationDialog: FC<ConfirmationDialogProps> = (props) => {
    return (
        <Dialog open={props.isOpened} onClose={props.closeDialog}>
            <DialogTitle>{props.title || 'Подтвердите действие'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={props.loading} onClick={props.onConfirm}>
                    Да
                </LoadingButton>
                <Button onClick={props.closeDialog} disabled={props.loading}>
                    Нет
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
