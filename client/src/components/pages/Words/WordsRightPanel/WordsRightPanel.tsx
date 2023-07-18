import React, { FC, useEffect } from 'react';
import { Checkbox, CircularProgress, FormControlLabel, Grid, Pagination, Paper, Typography } from '@mui/material';
import styles from './WordsRightPanel.module.scss';
import Search from 'components/UI/Search';
import WordsList from '../WordsList';
import { useLanguagesStore, useWordsStore } from 'context/StoreContext';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import WordsAPI from 'api/WordsAPI';
import { appConfig } from 'config/appConfig';
import useDebounce from 'hooks/useDebounce';
import useEvent from 'hooks/useEvent';

const WordsRightPanel: FC = () => {
    const languagesStore = useLanguagesStore();
    const { selectedLanguage } = languagesStore;
    const { showTranslation, setShowTranslation } = useWordsStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const wordsStore = useWordsStore();
    const page = Number(searchParams.get('page')) || 1;
    const pagesCount = Math.ceil((wordsStore.foundWordsAmount ?? selectedLanguage?.wordsAmount ?? 1) / appConfig.wordsPerPage);
    const searchText = useDebounce(wordsStore.searchText, 500);
    const { isFetching: isLoadingWords } = useQuery({
        queryKey: ['words', page],
        queryFn: () => WordsAPI.getWords(selectedLanguage!._id, appConfig.wordsPerPage, (page - 1) * appConfig.wordsPerPage),
        onSuccess(data) {
            if (data !== undefined) {
                languagesStore.setWords(data.words);
                wordsStore.setWordsAmount(data.wordsAmount);
            }
        },
        enabled: selectedLanguage !== null && wordsStore.searchText === '',
        keepPreviousData: true,
    });
    const { isFetching: isSearchingWords } = useQuery({
        queryKey: ['words', page, searchText],
        queryFn: () => WordsAPI.searchWords(selectedLanguage!._id, searchText, appConfig.wordsPerPage, (page - 1) * appConfig.wordsPerPage),
        onSuccess(data) {
            if (data !== undefined) {
                languagesStore.setWords(data.words);
                wordsStore.setFoundWordsAmount(data.wordsAmount);
            }
        },
        enabled: selectedLanguage !== null && searchText !== '',
        keepPreviousData: true,
    });
    const isLoading = isLoadingWords || isSearchingWords;

    function searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const text = e.target.value;

        wordsStore.setSearchText(text);

        if (text.trim() === '') {
            wordsStore.setFoundWordsAmount(undefined);
            setPage(1);
        }
    }

    function toggleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        setShowTranslation(e.target.checked);
    }

    const setPage = useEvent((page: number) => {
        setSearchParams((params) => {
            params.set('page', page.toString());
            return params;
        });
    });

    function pageChangeHandler(e: React.ChangeEvent<unknown>, page: number) {
        setPage(page);
    }

    useEffect(() => {
        if (searchText.trim() !== '') {
            setPage(1);
        }
    }, [searchText, setPage]);

    useEffect(() => {
        if (wordsStore.words.length === 0 && page > 1 && !isLoadingWords) {
            setPage(page - 1);
        }
    }, [isLoadingWords, page, setPage, wordsStore.words.length]);

    return (
        <Grid container direction="column" className={styles.wordsRightPanel} flexWrap="nowrap">
            <Grid item width={1}>
                <Search placeholder="Введите слово" onChange={searchHandler} value={wordsStore.searchText} fullWidth />
            </Grid>
            <Grid container item justifyContent="space-between" alignItems="center" gap={2}>
                <Grid item>
                    <FormControlLabel
                        control={<Checkbox disableRipple checked={showTranslation} onChange={toggleCheckbox} />}
                        label="Отображать перевод"
                    />
                </Grid>
                {isLoading && (
                    <Grid item mr={2} display="flex">
                        <CircularProgress size={22} />
                    </Grid>
                )}
            </Grid>
            <Grid item width={1} overflow="hidden">
                {wordsStore.words.length === 0 ? (
                    <Paper variant="outlined" className={styles.noWords}>
                        <Typography variant="h6" component="p" color="gray">
                            Слова отсутствуют
                        </Typography>
                    </Paper>
                ) : (
                    <WordsList words={wordsStore.words} showTranslation={showTranslation} />
                )}
            </Grid>
            {pagesCount > 1 && (
                <Grid container item width={1} mt="auto" pt={2} justifyContent="center">
                    <Grid item>
                        <Pagination page={page} count={pagesCount} onChange={pageChangeHandler} />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default observer(WordsRightPanel);
