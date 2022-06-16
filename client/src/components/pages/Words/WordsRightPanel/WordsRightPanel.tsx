import React, { FC, useCallback, useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Paper, Typography } from '@mui/material';
import styles from './WordsRightPanel.module.scss';
import Search from 'components/UI/Search';
import WordsList from '../WordsList';
import { Word } from 'types/common';
import { useLanguagesStore, useWordsStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';

const WordsRightPanel: FC = () => {
    const { selectedLanguage } = useLanguagesStore();
    const [words, setWords] = useState<Word[]>(selectedLanguage!.words);
    const [searchValue, setSearchValue] = useState<string>('');
    const { showTranslation, setShowTranslation } = useWordsStore();

    const filterWords = useCallback(() => {
        if (selectedLanguage === null) return;

        setWords(selectedLanguage.words.filter((word) => new RegExp(`^${searchValue}`, 'i').test(word.source)));
    }, [selectedLanguage, searchValue]);

    function search(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    function toggleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        setShowTranslation(e.target.checked);
    }

    useEffect(() => {
        filterWords();
    }, [filterWords, selectedLanguage?.words]);

    return (
        <div className={styles.wordsRightPanel}>
            <Search placeholder="Введите слово" onChange={search} fullWidth />
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

export default observer(WordsRightPanel);
