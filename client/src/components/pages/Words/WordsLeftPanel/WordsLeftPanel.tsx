import { Button, Typography } from '@mui/material';
import { FC } from 'react';
import styles from './WordsLeftPanel.module.scss';
import AddWordDialog from 'components/dialogs/AddWordDialog';
import getEnding from './utils/getEnding';
import useLeftPanel from './hooks/useLeftPanel';

const WordsLeftPanel: FC = () => {
    const { chosenLanguage, closeAddWordDialog, isAddWordDialogOpened, learnWords, openAddWordDialog } = useLeftPanel();

    return (
        <div className={styles.wordsLeftPanel}>
            <Typography component="h1" variant="h5">
                {chosenLanguage.name}
            </Typography>
            <div className={styles.wordsInfo}>
                <Typography component="p">Всего слов: {chosenLanguage.words.length}</Typography>
                <Typography component="p">
                    Сегодня необходимо повторить {chosenLanguage.wordsToLearn.length} {getEnding(chosenLanguage.wordsToLearn.length)}
                </Typography>
            </div>
            <div className={styles.buttonsWrapper}>
                <Button variant="contained" onClick={learnWords}>
                    Учить слова
                </Button>
                <Button onClick={openAddWordDialog} variant="contained">
                    Добавить слово
                </Button>
            </div>

            <AddWordDialog isOpened={isAddWordDialogOpened} closeDialog={closeAddWordDialog} />
        </div>
    );
};

export default WordsLeftPanel;
