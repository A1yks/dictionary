import { Button, Typography } from '@mui/material';
import { FC } from 'react';
import styles from './WordsLeftPanel.module.scss';
import AddWordDialog from 'components/dialogs/AddWordDialog';
import getEnding from './utils/getEnding';
import useLeftPanel from './hooks/useLeftPanel';
import { DialogNames } from 'components/dialogs/Dialog.types';
import { openDialogHandler } from 'components/UI/CustomDialog/controllers';
import { observer } from 'mobx-react-lite';

const WordsLeftPanel: FC = () => {
    const { selectedLanguage, wordsToLearn, learnWords } = useLeftPanel();

    return (
        <div className={styles.wordsLeftPanel}>
            <Typography component="h1" variant="h5">
                {selectedLanguage.name}
            </Typography>
            <div className={styles.wordsInfo}>
                <Typography component="p">Всего слов: {selectedLanguage.words.length}</Typography>
                <Typography component="p">
                    Сегодня необходимо повторить {wordsToLearn.length} {getEnding(wordsToLearn.length)}
                </Typography>
            </div>
            <div className={styles.buttonsWrapper}>
                <Button variant="contained" onClick={learnWords}>
                    Учить слова
                </Button>
                <Button onClick={openDialogHandler(DialogNames.ADD_WORD_DIALOG)} variant="contained">
                    Добавить слово
                </Button>
            </div>

            <AddWordDialog />
        </div>
    );
};

export default observer(WordsLeftPanel);
