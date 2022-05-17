import { FC, useCallback, useMemo, useState } from 'react';
import { useEffect, useContext } from 'react';
import { createContext } from 'react';
import LanguageEditError from 'errors/LanguageEditError';
import LanguageNotAddedError from 'errors/LanguageNotAddedError';
import LanguageNotDeletedError from 'errors/LanguageNotDeletedError';
import NoSuchLanguageError from 'errors/NoSuchLanguageError';
import WordDeletionError from 'errors/WordDeletionError';
import { Language, Word } from 'types/common';
import { IAppContext } from './AppContext.types';
import API from 'utils/api';
import WordAdditionError from 'errors/WordAdditionError';

const AppContext = createContext<IAppContext>({} as IAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: FC = (props) => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [chosenLanguage, setChosenLanguage] = useState<Language | null>(null);
    const [languagesLoaded, setLanguagesLoaded] = useState<boolean>(false);

    useEffect(() => {
        async function fetchLanguages() {
            try {
                const result = await API<Language[]>('/languages');

                setLanguages(result.data);
                setLanguagesLoaded(true);
            } catch (err) {
                console.error(err);
            }
        }

        if (!languagesLoaded) {
            fetchLanguages();
        }
    }, [languagesLoaded]);

    const addLanguage = useCallback(async (languageName: string) => {
        try {
            const response = await API<Language>('/languages/add', { method: 'POST', data: { languageName } });

            setLanguages((state) => [...state, response.data]);
        } catch (err) {
            if (typeof err === 'string') {
                throw new LanguageNotAddedError(err);
            }
        }
    }, []);

    const deleteLanguage = useCallback(async (langId: string) => {
        try {
            await API('/languages/delete', { method: 'DELETE', data: { langId } });
            setLanguages((state) => state.filter((lang) => lang.id !== langId));
        } catch (err) {
            if (typeof err === 'string') {
                throw new LanguageNotDeletedError(err);
            }
        }
    }, []);

    const editLanguage = useCallback(async (langId: string, languageName: string) => {
        try {
            const response = await API<Language>('/languages/edit', { method: 'PATCH', data: { langId, languageName } });

            setLanguages((state) =>
                state.map((lang) => {
                    if (lang.id !== langId) return lang;

                    return { ...lang, ...response.data };
                })
            );
        } catch (err) {
            if (typeof err === 'string') {
                throw new LanguageEditError(err);
            }
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
        try {
            const response = await API<Word>('/words/add', { method: 'POST', data: { langId, word } });

            setLanguages((state) =>
                state.map((lang) => {
                    if (lang.id !== langId) return lang;

                    return { ...lang, words: [...lang.words, response.data] };
                })
            );
        } catch (err) {
            if (typeof err === 'string') {
                throw new WordAdditionError(err);
            }
        }
    }, []);

    const deleteWords = useCallback(async (langId: string, words: Word[]) => {
        try {
            const response = await API<{ words: Word[]; wordsToLearn: Word[] }>('/words/delete', { method: 'DELETE', data: { langId, words } });

            setLanguages((state) =>
                state.map((lang) => {
                    if (lang.id !== langId) return lang;

                    return { ...lang, words: response.data.words, wordsToLearn: response.data.wordsToLearn };
                })
            );
        } catch (err) {
            if (typeof err === 'string') {
                throw new WordDeletionError();
            }
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

    const contextValue = useMemo(
        () => ({
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
        }),
        [
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
        ]
    );

    return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
};
