import { Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useLearnContext } from '../../context/LearnContext';
import LearnWords from '../words/LearnWords';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import styles from '../../styles/LearnWordsDialog.module.scss';

const LearnWordsDialog: FC<{}> = () => {
	const { chosenLanguage, languages, chooseLanguage } = useAppContext();
	const { isLearnWordsDialogOpened, closeLearnWordsDialog } = useLearnContext();

	useEffect(() => {
		if (chosenLanguage !== null) {
			chooseLanguage(chosenLanguage.id);
		}
	}, [languages]);

	if (chosenLanguage === null) return null;

	const wordsToLearnAmount = chosenLanguage.wordsToLearn.length;

	return (
		<Dialog
			open={isLearnWordsDialogOpened}
			maxWidth={wordsToLearnAmount === 0 ? 'sm' : 'md'}
			fullWidth
			onClose={closeLearnWordsDialog}
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
					<LearnWords language={chosenLanguage} />
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={closeLearnWordsDialog}>Закрыть</Button>
			</DialogActions>
		</Dialog>
	);
};

export default LearnWordsDialog;
