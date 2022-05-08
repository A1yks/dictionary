import { Container, Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { RouteParams } from '../../types/common';
import WordsLeftPanel from './WordsLeftPanel';
import styles from '../../styles/Words.module.scss';
import NoSuchLanguageError from '../../errors/NoSuchLanguageError';
import PageLoader from '../PageLoader';
import WordsRightPanel from './WordsRightPanel';
import DeleteWordConfirmation from '../dialogs/DeleteWordConfirmation';
import ShowWordFullInfoDialog from '../dialogs/ShowWordFullInfoDialog';

const Words: FC<{}> = () => {
	const { chosenLanguage, chooseLanguage, languages } = useAppContext();
	const { langId } = useParams<RouteParams>();
	const navigate = useNavigate();

	function updateChosenLanguage() {
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
	}

	useEffect(() => {
		if (chosenLanguage === null) {
			updateChosenLanguage();
		}
	}, [chosenLanguage, langId, chooseLanguage, navigate]);

	useEffect(() => {
		updateChosenLanguage();
	}, [languages]);

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
		</div>
	);
};

export default Words;
