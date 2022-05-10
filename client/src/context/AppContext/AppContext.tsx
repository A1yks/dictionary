import { FC, useCallback, useState } from 'react';
import { useEffect, useContext } from 'react';
import { createContext } from 'react';
import LanguageEditError from 'errors/LanguageEditError';
import LanguageNotAddedError from 'errors/LanguageNotAddedError';
import LanguageNotDeletedError from 'errors/LanguageNotDeletedError';
import NoSuchLanguageError from 'errors/NoSuchLanguageError';
import WordAdditionError from 'errors/WordAdditionError';
import WordDeletionError from 'errors/WordDeletionError';
import { Language, Word } from 'types/common';
import request from 'utils/request';
import { IAppContext } from './AppContext.types';

const AppContext = createContext<IAppContext>({} as IAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: FC = (props) => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [chosenLanguage, setChosenLanguage] = useState<Language | null>(null);
    const [languagesLoaded, setLanguagesLoaded] = useState<boolean>(false);

    useEffect(() => {
        async function fetchLanguages() {
            try {
                const result = await request.get<Language[]>('/languages/get');

                if (result.success) {
                    setLanguages(result.data);
                    setLanguagesLoaded(true);
                } else {
                    throw new Error('Languages was not loaded');
                }
            } catch (err) {
                console.error(err);
            }
        }

        if (!languagesLoaded) {
            fetchLanguages();
        }
    }, [languagesLoaded]);

    const addLanguage = useCallback(async (languageName: string) => {
        const result = await request.post<Language>('/languages/add', { languageName });

        if (result.success) {
            setLanguages((state) => [...state, result.data]);
        } else {
            throw new LanguageNotAddedError();
        }
    }, []);

    const deleteLanguage = useCallback(async (id: string) => {
        const result = await request.post('/languages/delete', { id });

        if (result.success) {
            setLanguages((state) => state.filter((language) => language.id !== id));
        } else {
            throw new LanguageNotDeletedError();
        }
    }, []);

    const editLanguage = useCallback(async (id: string, data: Language) => {
        const result = await request.post('/languages/edit', { id, data });

        if (result.success) {
            setLanguages((state) =>
                state.map((lang) => {
                    if (lang.id !== id) return lang;

                    return { ...lang, ...data };
                })
            );
        } else {
            throw new LanguageEditError();
        }
    }, []);

    const chooseLanguage = useCallback(
        (language: Language | string) => {
            let languageObject: Language | undefined = undefined;

            if (typeof language === 'string') {
                languageObject = languages.find(({ id }) => language === id);
            } else {
                languageObject = language;
            }

            if (languageObject !== undefined) {
                setChosenLanguage(languageObject);
            } else {
                throw new NoSuchLanguageError();
            }
        },
        [languages]
    );

    const getLanguage = useCallback(
        (id: string) => {
            const language = languages.find((lang) => lang.id === id);

            if (language === undefined) {
                throw new NoSuchLanguageError();
            }

            return language;
        },
        [languages]
    );

    const addWord = useCallback(async (langId: string, word: Word) => {
        const response = await request.post('/words/add', { langId, word });

        if (response.success) {
            setLanguages((state) =>
                state.map((lang) => {
                    if (lang.id !== langId) return lang;

                    return { ...lang, words: [...lang.words, word], wordsToLearn: [...lang.words, word] };
                })
            );
        } else {
            throw new WordAdditionError();
        }
    }, []);

    const deleteWords = useCallback(async (langId: string, words: string[]) => {
        const response = await request.post('/words/delete', { langId, words });

        if (response.success) {
            setLanguages((state) =>
                state.map((lang) => {
                    if (lang.id !== langId) return lang;

                    const filteredWords = lang.words.filter(({ source }) => !words.includes(source));

                    return { ...lang, words: filteredWords, wordsToLearn: [...filteredWords] };
                })
            );
        } else {
            throw new WordDeletionError();
        }
    }, []);

    const learnWord = useCallback((langId: string, word: Word) => {
        setLanguages((state) =>
            state.map((lang) => {
                if (lang.id !== langId) return lang;

                return { ...lang, wordsToLearn: lang.wordsToLearn.filter(({ source }) => word.source !== source) };
            })
        );
    }, []);

    return (
        <AppContext.Provider
            value={{
                languages,
                chosenLanguage,
                languagesLoaded,
                addLanguage,
                deleteLanguage,
                editLanguage,
                chooseLanguage,
                addWord,
                getLanguage,
                deleteWords,
                learnWord,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
