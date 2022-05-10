import { Container, Grid } from '@mui/material';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from 'context/AppContext';
import { RouteParams } from 'types/common';
import WordsLeftPanel from './WordsLeftPanel';
import styles from './Words.module.scss';
import NoSuchLanguageError from 'errors/NoSuchLanguageError';
import PageLoader from 'components/ui/PageLoader';
import WordsRightPanel from './WordsRightPanel';
import DeleteWordConfirmation from 'components/dialogs/DeleteWordConfirmation';
import ShowWordFullInfoDialog from 'components/dialogs/ShowWordFullInfoDialog';
import LearnWordsDialog from 'components/dialogs/LearnWordsDialog';

const Words: FC = () => {
    const { chosenLanguage, chooseLanguage, languages } = useAppContext();
    const { langId } = useParams<RouteParams>();
    const navigate = useNavigate();

    const updateChosenLanguage = useCallback(() => {
        if (langId !== undefined) {
            try {
                chooseLanguage(langId);
            } catch (err) {
                if (err instanceof NoSuchLanguageError) {
                    navigate('/');
                }

                console.error(err);
            }
        }
    }, [chooseLanguage, langId, navigate]);

    useEffect(() => {
        if (chosenLanguage === null) {
            updateChosenLanguage();
        }
    }, [chosenLanguage, updateChosenLanguage]);

    useEffect(() => {
        updateChosenLanguage();
    }, [languages, updateChosenLanguage]);

    if (chosenLanguage === null) {
        return <PageLoader />;
    }

    return (
        <div>
            <Container maxWidth="lg" className={styles.wordsContainer}>
                <Grid container className={styles.panelsWrapper}>
                    <Grid item xs={4}>
                        <WordsLeftPanel />
                    </Grid>
                    <Grid item xs={8}>
                        <WordsRightPanel />
                    </Grid>
                </Grid>
            </Container>

            <DeleteWordConfirmation />
            <ShowWordFullInfoDialog />
            <LearnWordsDialog />
        </div>
    );
};

export default Words;
