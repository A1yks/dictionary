import { FC } from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Language } from '../types/common';
import parentStyles from '../styles/Dictionaries.module.scss';
import styles from '../styles/DictionaryCard.module.scss';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { useDictionariesContext } from '../context/DictionariesContext';
import { useLearnContext } from '../context/LearnContext';

interface Props {
	language: Language;
}

const DictionaryCard: FC<Props> = (props) => {
	const { chooseLanguage } = useAppContext();
	const { setWorkingLanguageId, openEditDialog, openDeleteDialog } = useDictionariesContext();
	const { openLearnWordsDialog } = useLearnContext();

	function chooseCurrentLanguage() {
		chooseLanguage(props.language);
	}

	function openDialogHandler(callback: () => void) {
		return () => {
			setWorkingLanguageId(props.language.id);
			callback();
		};
	}

	function openLearnWordsDialogHandler() {
		chooseCurrentLanguage();
		openLearnWordsDialog();
	}

	return (
		<Card variant="outlined" className={parentStyles.card}>
			<CardContent>
				<Typography component="p" variant="h5">
					{props.language.name}
				</Typography>
				<div className={styles.wordsInfo}>
					<Typography component="p" color="blue">
						Добавлено слов:{' '}
						<Typography component="span" color="black">
							{props.language.words.length}
						</Typography>
					</Typography>
					<Typography component="p" color="lime">
						Выучено слов:{' '}
						<Typography component="span" color="black">
							{props.language.wordsLearned}
						</Typography>
					</Typography>
				</div>
			</CardContent>
			<CardActions>
				<div className={styles.cardActionsWrapper}>
					<Link to={`/language/${props.language.id}`} className={styles.btn}>
						<Button size="small" color="primary" variant="contained" onClick={chooseCurrentLanguage}>
							Просмотр слов
						</Button>
					</Link>
					<Button className={styles.btn} size="small" color="primary" variant="contained" onClick={openLearnWordsDialogHandler}>
						Учить слова
					</Button>

					<div className={styles.iconsWrapper}>
						<Tooltip title="Редактировать название">
							<IconButton size="medium" className={styles.icon} onClick={openDialogHandler(openEditDialog)}>
								<EditIcon fontSize="medium" />
							</IconButton>
						</Tooltip>
						<Tooltip title="Удалить язык">
							<IconButton size="medium" className={styles.icon} onClick={openDialogHandler(openDeleteDialog)}>
								<DeleteIcon fontSize="medium" />
							</IconButton>
						</Tooltip>
					</div>
				</div>
			</CardActions>
		</Card>
	);
};

export default DictionaryCard;
