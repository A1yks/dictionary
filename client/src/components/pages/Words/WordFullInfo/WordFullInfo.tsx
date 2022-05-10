import { Grid, Paper } from '@mui/material';
import { FC } from 'react';
import styles from './WordFullInfo.module.scss';
import WordsListItem from '../WordsList/WordsListItem';
import WordTranslations from '../WordTranslations';
import WordDefinitions from '../WordDefinitions';
import c from 'classnames';
import { WordFullInfoProps } from './WordFullInfo.types';

const WordFullInfo: FC<WordFullInfoProps> = (props) => {
    const { wordInfo } = props;

    return (
        <Paper variant="outlined" className={styles.fullInfo}>
            <div>
                <WordsListItem showTranslation showTranscription wordInfo={wordInfo} className={styles.wordListItem} />
                <Grid container>
                    <Grid
                        item
                        xs={wordInfo.hasDefinitions ? 6 : 12}
                        className={c(styles.gridItem, { [styles.wordTranslations]: wordInfo.hasDefinitions })}
                    >
                        <WordTranslations wordInfo={wordInfo} />
                    </Grid>
                    {wordInfo.hasDefinitions && (
                        <Grid item xs={6} className={c(styles.gridItem, styles.wordDefinitions)}>
                            <WordDefinitions wordInfo={wordInfo} />
                        </Grid>
                    )}
                </Grid>
            </div>
        </Paper>
    );
};

export default WordFullInfo;
