import { FC } from 'react';
import WordsListItem from './WordsListItem';
import styles from './WordList.module.scss';
import { Paper } from '@mui/material';
import { WordsListProps } from './WordsList.types';

const WordsList: FC<WordsListProps> = (props) => {
    return (
        <Paper variant="outlined" className={styles.wordList}>
            {props.words.map((wordInfo) => {
                return <WordsListItem key={wordInfo.source} wordInfo={wordInfo} showTranslation={props.showTranslation} showActions />;
            })}
        </Paper>
    );
};

export default WordsList;
