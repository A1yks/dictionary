import { Container, Grid } from '@mui/material';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteParams } from 'types/common';
import WordsLeftPanel from './WordsLeftPanel';
import styles from './Words.module.scss';
import NoSuchLanguageError from 'errors/NoSuchLanguageError';
import PageLoader from 'components/UI/PageLoader';
import WordsRightPanel from './WordsRightPanel';
import DeleteWordConfirmationDialog from 'components/dialogs/DeleteWordConfirmationDialog';
import ShowWordFullInfoDialog from 'components/dialogs/ShowWordFullInfoDialog';
import LearnWordsDialog from 'components/dialogs/LearnWordsDialog';
import { useLanguagesStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import NavbarLayout from 'components/layouts/NavbarLayout';

const Words: FC = () => {
    const { selectedLanguage, selectLanguage, languages } = useLanguagesStore();
    const { langId } = useParams<RouteParams>();
    const navigate = useNavigate();

    const updateSelectedLanguage = useCallback(() => {
        if (langId !== undefined) {
            try {
                selectLanguage(langId);
            } catch (err) {
                if (err instanceof NoSuchLanguageError) {
                    return navigate('/');
                }

                console.error(err);
            }
        }
    }, [selectLanguage, langId, navigate]);

    useEffect(() => {
        if (selectedLanguage === null) {
            updateSelectedLanguage();
        }
    }, [selectedLanguage, updateSelectedLanguage]);

    useEffect(() => {
        updateSelectedLanguage();
    }, [languages, updateSelectedLanguage]);

    if (selectedLanguage === null) {
        return <PageLoader />;
    }

    return (
        <div className="page">
            <NavbarLayout>
                <Container maxWidth="lg" className={styles.wordsContainer}>
                    <Grid container className={styles.panelsWrapper}>
                        <Grid item xs={4}>
                            <WordsLeftPanel />
                        </Grid>
                        <Grid item xs={8} height="100%">
                            <WordsRightPanel />
                        </Grid>
                    </Grid>
                </Container>

                <DeleteWordConfirmationDialog />
                <ShowWordFullInfoDialog />
                <LearnWordsDialog />
            </NavbarLayout>
        </div>
    );
};

export default observer(Words);
