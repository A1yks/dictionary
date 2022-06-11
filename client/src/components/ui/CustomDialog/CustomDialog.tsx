import { Dialog } from '@mui/material';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect } from 'react';
import { addDialog, dialogs } from './controllers';
import { CustomDialogProps } from './CustomDialog.types';

const CustomDialog: FC<CustomDialogProps> = (props) => {
    const { onClose, children, id, ...restProps } = props;

    addDialog(id);

    useEffect(() => {
        addDialog(id);

        return () => {
            runInAction(() => delete dialogs[id]);
        };
    }, [id]);

    const closeHandler = useCallback(() => {
        if (onClose) onClose();

        runInAction(() => (dialogs[id].opened = false));
    }, [id, onClose]);

    return (
        <Dialog open={dialogs[id].opened} onClose={closeHandler} {...restProps}>
            {children}
        </Dialog>
    );
};

export default observer(CustomDialog);
