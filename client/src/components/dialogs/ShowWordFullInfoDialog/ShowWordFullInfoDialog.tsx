import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { FC } from 'react';
import { useWordsContext } from 'context/WordsContext';
import WordFullInfo from 'components/pages/Words/WordFullInfo';

const ShowWordFullInfoDialog: FC = () => {
    const { isWordFullInfoDialogOpened, closeWordFullInfoDialog, wordInfo } = useWordsContext();

    if (wordInfo === null) {
        return null;
    }

    return (
        <Dialog open={isWordFullInfoDialogOpened} onClose={closeWordFullInfoDialog} maxWidth="md" fullWidth>
            <DialogContent>
                <WordFullInfo wordInfo={wordInfo} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeWordFullInfoDialog}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowWordFullInfoDialog;
