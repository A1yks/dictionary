import { Button, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import LearnWords from 'components/helpers/LearnWords';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import styles from './LearnWordsDialog.module.scss';
import { useLanguagesStore } from 'context/StoreContext';
import { CustomDialog } from 'components/UI/CustomDialog';
import { DialogNames } from '../Dialog.types';
import { closeDialogHandler } from 'components/UI/CustomDialog/controllers';
import { observer } from 'mobx-react-lite';

const LearnWordsDialog: FC = () => {
    const { selectedLanguage } = useLanguagesStore();

    // useEffect(() => {
    //     if (selectedLanguage !== null) {
    //         selectLanguage(selectedLanguage.id);
    //     }
    // }, [languages, selectedLanguage, selectLanguage]);

    if (selectedLanguage === null) return null;

    const wordsToLearnAmount = selectedLanguage.wordsToLearn.length;

    return (
        <CustomDialog
            id={DialogNames.LEARN_WORDS_DIALOG}
            maxWidth={wordsToLearnAmount === 0 ? 'sm' : 'md'}
            fullWidth
            className={styles.learnWordsDialog}
        >
            <DialogContent>
                {wordsToLearnAmount === 0 ? (
                    <Grid container spacing={1} justifyContent="center" alignItems="center" className={styles.noMoreWords}>
                        <Grid item>
                            <ThumbUpIcon color="success" />
                        </Grid>
                        <Grid item>
                            <Typography component="span" variant="h6">
                                Слов для изучения больше не осталось
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <LearnWords language={selectedLanguage} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogHandler(DialogNames.LEARN_WORDS_DIALOG)}>Закрыть</Button>
            </DialogActions>
        </CustomDialog>
    );
};

export default observer(LearnWordsDialog);
