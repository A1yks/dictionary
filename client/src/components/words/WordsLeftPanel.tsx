import { Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { RouteParams } from '../../types/common';
import styles from '../../styles/WordsLeftPanel.module.scss';
import AddWordDialog from '../dialogs/AddWordDialog';

function getEnding(wordsAmount: number): string {
	const lastNumber = wordsAmount % 10;
	const lastTwoNumbers = wordsAmount % 100;

	if (lastTwoNumbers > 10 && lastTwoNumbers < 20) return 'слов';

	if (lastNumber > 1 && lastNumber < 5) return 'слова';

	if (lastNumber === 1) return 'слово';

	return 'слов';
}

const WordsLeftPanel: FC<{}> = () => {
	const context = useAppContext();
	const { langId } = useParams<RouteParams>();
	const [isAddWordDialogOpened, setAddWordDialogOpened] = useState<boolean>(false);
	const chosenLanguage = context.chosenLanguage!;

	function openAddWordDialog() {
		setAddWordDialogOpened(true);
	}

	function closeAddWordDialog() {
		setAddWordDialogOpened(false);
	}

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
				<Link to={`/learn/${langId}`} className={styles.link}>
					<Button variant="contained">Учить слова</Button>
				</Link>
				<Button onClick={openAddWordDialog} variant="contained">
					Добавить слово
				</Button>
			</div>

			<AddWordDialog isOpened={isAddWordDialogOpened} closeDialog={closeAddWordDialog} />
		</div>
	);
};

export default WordsLeftPanel;
