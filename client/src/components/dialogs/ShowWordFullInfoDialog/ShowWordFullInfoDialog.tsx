import { Button, DialogActions, DialogContent } from '@mui/material';
import { FC } from 'react';
import WordFullInfo from 'components/pages/Words/WordFullInfo';
import { CustomDialog } from 'components/UI/CustomDialog';
import { DialogNames } from '../Dialog.types';
import { closeDialogHandler } from 'components/UI/CustomDialog/controllers';
import { useWordsStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';

const ShowWordFullInfoDialog: FC = () => {
    const { wordInfo } = useWordsStore();

    if (wordInfo === null) return null;

    return (
        <CustomDialog id={DialogNames.SHOW_WORD_FULL_INFO_DIALOG} maxWidth="md" fullWidth>
            <DialogContent>
                <WordFullInfo wordInfo={wordInfo} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogHandler(DialogNames.SHOW_WORD_FULL_INFO_DIALOG)}>Закрыть</Button>
            </DialogActions>
        </CustomDialog>
    );
};

export default observer(ShowWordFullInfoDialog);
