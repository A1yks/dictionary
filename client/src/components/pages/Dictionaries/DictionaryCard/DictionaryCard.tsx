import { FC } from 'react';
import { Button, Card, CardActions, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import parentStyles from '../Dictionaries.module.scss';
import styles from './DictionaryCard.module.scss';
import { Link } from 'react-router-dom';
import { DictionaryCardProps } from './DictionaryCard.types';
import { useDictionariesStore, useLanguagesStore } from 'context/StoreContext';
import { DialogNames } from 'components/dialogs/Dialog.types';
import { openDialog, openDialogHandler } from 'components/UI/CustomDialog/controllers';
import { observer } from 'mobx-react-lite';
import { flushSync } from 'react-dom';

const DictionaryCard: FC<DictionaryCardProps> = (props) => {
    const { setWorkingLanguageId } = useDictionariesStore();
    const { selectLanguage } = useLanguagesStore();
    const openEditDialog = openDialogHandler(DialogNames.EDIT_LANGUAGE_NAME_DIALOG);
    const openDeleteDialog = openDialogHandler(DialogNames.DELETE_LANGUAGE_DIALOG);

    function chooseCurrentLanguage() {
        selectLanguage(props.language);
    }

    function openDialogWrapper(callback: () => void) {
        return () => {
            setWorkingLanguageId(props.language.id);
            callback();
        };
    }

    function openLearnWordsDialogHandler() {
        flushSync(chooseCurrentLanguage);
        openDialog(DialogNames.LEARN_WORDS_DIALOG);
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
                            <IconButton size="medium" className={styles.icon} onClick={openDialogWrapper(openEditDialog)}>
                                <EditIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить язык">
                            <IconButton size="medium" className={styles.icon} onClick={openDialogWrapper(openDeleteDialog)}>
                                <DeleteIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </CardActions>
        </Card>
    );
};

export default observer(DictionaryCard);
