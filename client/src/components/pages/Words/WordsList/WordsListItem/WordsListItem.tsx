import { CircularProgress, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './WordListItem.module.scss';
import c from 'classnames';
import { WordListItemProps } from './WordListItem.types';
import useAudio from './hooks/useAudio';
import useDialogs from './hooks/useDialogs';

const WordsListItem: FC<WordListItemProps> = (props) => {
    const { openDeleteWordDialogHandler, openWordFullInfoDialogHandler } = useDialogs(props.wordInfo);
    const { playWord, audioLoading } = useAudio(props.wordInfo?.phonetic?.audio);

    if (props.loading) {
        return (
            <Paper variant="outlined">
                <div className={styles.loader}>
                    <CircularProgress size="1.5rem" />
                </div>
            </Paper>
        );
    }

    if (props.wordInfo !== null) {
        return (
            <Paper className={c(styles.item, props.className)} variant="outlined">
                <div className={styles.firstTranslations}>
                    <Typography component="span" className={styles.sourceWord}>
                        {props.wordInfo.source}{' '}
                        {props.showTranscription && props.wordInfo.phonetic?.text && (
                            <Typography component="span" className={styles.transcription}>
                                [{props.wordInfo.phonetic.text}]
                            </Typography>
                        )}
                    </Typography>
                    {props.showTranslation && (
                        <>
                            <Typography component="span">
                                {' - '}
                                {props.wordInfo.firstTranslations.join(', ')}
                            </Typography>
                        </>
                    )}
                </div>

                <div className={styles.buttons}>
                    {props.wordInfo?.phonetic?.audio && (
                        <Tooltip title="Прослушать произношение">
                            <IconButton onClick={playWord} disabled={audioLoading}>
                                {audioLoading ? <CircularProgress size={24} color="inherit" /> : <VolumeUpIcon />}
                            </IconButton>
                        </Tooltip>
                    )}
                    {props.showActions && (
                        <>
                            <Tooltip title="Показать полную информацию о слове">
                                <IconButton onClick={openWordFullInfoDialogHandler}>
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Удалить слово">
                                <IconButton onClick={openDeleteWordDialogHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </div>
            </Paper>
        );
    }

    return null;
};

export default WordsListItem;
