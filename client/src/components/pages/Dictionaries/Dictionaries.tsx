import { FC, useState } from 'react';
import { Grid, Paper, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './Dictionaries.module.scss';
import AddDictionaryForm from 'components/dialogs/AddDictionaryForm';
import { useAppContext } from 'context/AppContext';
import DictionaryCard from 'components/pages/Dictionaries/DictionaryCard';
import c from 'classnames';
import DeleteConfirmation from 'components/dialogs/DeleteConfirmation';
import EditLanguageName from 'components/dialogs/EditLanguageName';
import LearnWordsDialog from 'components/dialogs/LearnWordsDialog';

const Dictionaries: FC = () => {
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
