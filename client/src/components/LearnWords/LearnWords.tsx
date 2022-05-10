import { Button, Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import styles from './LearnWords.module.scss';
import { useAppContext } from 'context/AppContext';
import { LearnWordsProps, WordGrade } from './LearnWords.types';

const LearnWords: FC<LearnWordsProps> = (props) => {
    const { learnWord } = useAppContext();
    const [showTranslation, setShowTranslation] = useState<boolean>(false);
    const { wordsToLearn } = props.language;
    const word = wordsToLearn[0];

    function toggleTranslation() {
        setShowTranslation((state) => !state);
    }

    function nextWord() {
        learnWord(props.language.id, word);
    }

    function gradeWord(grade: WordGrade) {
        return () => {
            nextWord();
        };
    }

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
                        <Button variant="contained" color="success" onClick={gradeWord(WordGrade.EASY)}>
                            Легко
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="warning" onClick={gradeWord(WordGrade.NORMAL)}>
                            Нормально
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="error" onClick={gradeWord(WordGrade.HARD)}>
                            Сложно
                        </Button>
                    </Grid>
                    <Grid item className={styles.skipBtn}>
                        <Button variant="contained" color="secondary" onClick={nextWord}>
                            Пропустить
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LearnWords;
