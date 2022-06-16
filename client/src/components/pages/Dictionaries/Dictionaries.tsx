import { FC } from 'react';
import { Grid, Paper, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './Dictionaries.module.scss';
import AddDictionaryDialog from 'components/dialogs/AddDictionaryDialog';
import DictionaryCard from 'components/pages/Dictionaries/DictionaryCard';
import c from 'classnames';
import DeleteLanguageDialog from 'components/dialogs/DeleteLanguageDialog';
import EditLanguageNameDialog from 'components/dialogs/EditLanguageNameDialog';
import LearnWordsDialog from 'components/dialogs/LearnWordsDialog';
import { useLanguagesStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import { openDialogHandler } from 'components/UI/CustomDialog/controllers';
import { DialogNames } from 'components/dialogs/Dialog.types';
import NavbarLayout from 'components/layouts/NavbarLayout';

const Dictionaries: FC = () => {
    const { languages } = useLanguagesStore();

    return (
        <NavbarLayout>
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
                                <IconButton size="medium" onClick={openDialogHandler(DialogNames.ADD_DICTIONARY_DIALOG)}>
                                    <AddIcon fontSize="medium" />
                                </IconButton>
                            </Tooltip>
                        </Paper>
                    </Grid>
                </Grid>

                <AddDictionaryDialog />
                <DeleteLanguageDialog />
                <EditLanguageNameDialog />
                <LearnWordsDialog />
            </div>
        </NavbarLayout>
    );
};

export default observer(Dictionaries);
