import React, { FC, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Paper, Typography } from '@mui/material';
import styles from '../../styles/WordsRightPanel.module.scss';
import Search from '../Search';
import WordsList from './WordsList';
import { useAppContext } from '../../context/AppContext';
import { Word } from '../../types/common';

const WordsRightPanel: FC<{}> = () => {
	const context = useAppContext();
	const chosenLanguage = context.chosenLanguage!;
	const [words, setWords] = useState<Word[]>(chosenLanguage.words);
	const [searchValue, setSearchValue] = useState<string>('');
	const [showTranslation, setShowTranslation] = useState<boolean>(true);

	function filterWords() {
		setWords(chosenLanguage.words.filter((word) => new RegExp(`^${searchValue}`, 'i').test(word.source)));
	}

	function search(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchValue(e.target.value);
	}

	function toggleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
		setShowTranslation(e.target.checked);
	}

	useEffect(() => {
		filterWords();
	}, [chosenLanguage.words, searchValue]);

	return (
		<div className={styles.wordsRightPanel}>
			<Search placeholder="Введите слово" onChange={search} />
			<FormControlLabel control={<Checkbox disableRipple checked={showTranslation} onChange={toggleCheckbox} />} label="Отображать перевод" />
			{words.length === 0 ? (
				<Paper variant="outlined" className={styles.noWords}>
					<Typography variant="h6" component="p" color="gray">
						Слова отсутствуют
					</Typography>
				</Paper>
			) : (
				<WordsList words={words} showTranslation={showTranslation} />
			)}
		</div>
	);
};

export default WordsRightPanel;
