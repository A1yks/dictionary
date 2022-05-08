import { FC } from 'react';
import { Word } from '../../types/common';
import WordsListItem from './WordsListItem';
import styles from '../../styles/WordList.module.scss';
import { Paper } from '@mui/material';

interface Props {
	words: Word[];
	showTranslation?: boolean;
}

const WordsList: FC<Props> = (props) => {
	return (
		<Paper variant="outlined" className={styles.wordList}>
			{props.words.map((wordInfo) => {
				return <WordsListItem key={wordInfo.source} wordInfo={wordInfo} showTranslation={props.showTranslation} showActions />;
			})}
		</Paper>
	);
};

export default WordsList;
