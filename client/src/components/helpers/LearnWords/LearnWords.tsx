import { Button, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import styles from './LearnWords.module.scss';
import { ButtonsLoading } from './LearnWords.types';
import { observer } from 'mobx-react-lite';
import { useWordsStore } from 'context/StoreContext';
import { LearnFeedbacks } from 'types/common';
import { LoadingButton } from '@mui/lab';

const defaultButtonsLoadingState = {
    [LearnFeedbacks.EASY]: false,
    [LearnFeedbacks.NORMAL]: false,
    [LearnFeedbacks.HARD]: false,
};

const LearnWords: FC = () => {
    const { learnWord, wordsToLearn, loading } = useWordsStore();
    const [showTranslation, setShowTranslation] = useState<boolean>(false);
    const [buttonsLoading, setButtonsLoading] = useState<ButtonsLoading>(defaultButtonsLoadingState);
    const [wordIndex, setWordIndex] = useState<number>(0);
    const word = wordsToLearn[wordIndex % wordsToLearn.length];

    function toggleTranslation() {
        setShowTranslation((state) => !state);
    }

    function skipWord() {
        setWordIndex((index) => ++index % wordsToLearn.length);
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
    }, [loading]);

    useEffect(() => {
        setWordIndex((index) => index % wordsToLearn.length);
    }, [wordsToLearn.length]);

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
                        <Button variant="contained" color="secondary" onClick={skipWord} disabled={loading}>
                            Пропустить
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default observer(LearnWords);
