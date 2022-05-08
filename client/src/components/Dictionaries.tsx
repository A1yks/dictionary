import { FC, useState } from 'react';
import { Grid, Paper, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles/Dictionaries.module.scss';
import AddDictionaryForm from './dialogs/AddDictionaryForm';
import { useAppContext } from '../context/AppContext';
import DictionaryCard from './DictionaryCard';
import c from 'classnames';
import DeleteConfirmation from './dialogs/DeleteConfirmation';
import EditLanguageName from './dialogs/EditLanguageName';
import LearnWordsDialog from './dialogs/LearnWordsDialog';

const Dictionaries: FC<{}> = () => {
	const { languages } = useAppContext();
	const [isAddDialogOpened, setAddDialogOpened] = useState<boolean>(false);

	const closeHandler = () => setAddDialogOpened(false);

	const openHandler = () => setAddDialogOpened(true);

	return (
		<div className={styles.box}>
			<Grid container spacing={4} className={styles.container}>
				{languages.map((language) => (
					<Grid item key={language.name}>
						<DictionaryCard key={language.name} language={language} />
					</Grid>
				))}

				<Grid item>
					<Paper variant="outlined" className={c(styles.card, styles.addLanguage)}>
						<Tooltip title="Добавить язык">
							<IconButton size="medium" onClick={openHandler}>
								<AddIcon fontSize="medium" />
							</IconButton>
						</Tooltip>
					</Paper>
				</Grid>
			</Grid>

			<AddDictionaryForm isOpened={isAddDialogOpened} closeDialog={closeHandler} />
			<DeleteConfirmation />
			<EditLanguageName />
			<LearnWordsDialog />
		</div>
	);
};

export default Dictionaries;
