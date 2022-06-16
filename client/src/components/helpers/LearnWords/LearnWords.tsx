import { Button, Grid, Typography } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import styles from './LearnWords.module.scss';
import { ButtonsLoading, LearnWordsProps } from './LearnWords.types';
import { observer } from 'mobx-react-lite';
import { useWordsStore } from 'context/StoreContext';
import { LearnFeedbacks } from 'types/common';
import { LoadingButton } from '@mui/lab';

const LearnWords: FC<LearnWordsProps> = (props) => {
    const { learnWord, wordsToLearn, loading } = useWordsStore();
    const [showTranslation, setShowTranslation] = useState<boolean>(false);
    const defaultButtonsLoadingState: ButtonsLoading = useMemo(
        () => ({
            [LearnFeedbacks.EASY]: false,
            [LearnFeedbacks.NORMAL]: false,
            [LearnFeedbacks.HARD]: false,
        }),
        []
    );
    const [buttonsLoading, setButtonsLoading] = useState<ButtonsLoading>(defaultButtonsLoadingState);
    const word = wordsToLearn[0];

    function toggleTranslation() {
        setShowTranslation((state) => !state);
    }

    function nextWord() {
        learnWord(word, LearnFeedbacks.SKIP);
    }

    function gradeWord(feedback: LearnFeedbacks) {
        return () => {
            setButtonsLoading((state) => ({ ...state, [feedback]: true }));
            learnWord(word, feedback);
        };
    }

    useEffect(() => {
        if (!loading) {
            setButtonsLoading(defaultButtonsLoadingState);
        }
    }, [loading, defaultButtonsLoadingState]);

    return (
        <Grid container direction="column" className={styles.learnWords} spacing={2}>
            <Grid container item direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Typography component="p" variant="h6" className={styles.sourceWord}>
                        {word.source}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={toggleTranslation}>
                        {showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
                    </Button>
                </Grid>
                {showTranslation && (
                    <Grid item className={styles.translation}>
                        <Typography component="p" variant="h6">
                            {word.firstTranslations.join(', ')}
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <Grid container item className={styles.buttons}>
                <Grid container item spacing={1} justifyContent="center">
                    <Grid item>
                        <LoadingButton
                            variant="contained"
                            color="success"
                            onClick={gradeWord(LearnFeedbacks.EASY)}
                            loading={buttonsLoading[LearnFeedbacks.EASY]}
                            disabled={loading}
                        >
                            Легко
                        </LoadingButton>
                    </Grid>
                    <Grid item>
                        <LoadingButton
                            variant="contained"
                            color="warning"
                            onClick={gradeWord(LearnFeedbacks.NORMAL)}
                            loading={buttonsLoading[LearnFeedbacks.NORMAL]}
                            disabled={loading}
                        >
                            Нормально
                        </LoadingButton>
                    </Grid>
                    <Grid item>
                        <LoadingButton
                            variant="contained"
                            color="error"
                            onClick={gradeWord(LearnFeedbacks.HARD)}
                            loading={buttonsLoading[LearnFeedbacks.HARD]}
                            disabled={loading}
                        >
                            Сложно
                        </LoadingButton>
                    </Grid>
                    <Grid item className={styles.skipBtn}>
                        <Button variant="contained" color="secondary" onClick={nextWord} disabled={loading}>
                            Пропустить
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default observer(LearnWords);
