import axios, { AxiosError } from 'axios';
import { IDefinition, IPartsOfSpeech, IPhonetic, IWord } from '../models/Word';

// TODO move to skyeng api

// Yandex english-russian dictionary

interface YandexDictMeaning {
    text: string;
}

interface Translation {
    text: string;
    fr: number;
    gen: string;
    mean: YandexDictMeaning[];
    syn: Translation[];
    ex: WordInfo[];
}

interface WordInfo {
    pos: string;
    text: string;
    tr: Translation[];
    ts: string;
}

interface YandexTranslationResult {
    head: Record<string, unknown>;
    def: WordInfo[];
}

// English dictionary

interface Definition {
    definition: string;
    example: string;
    antonyms: string[];
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
}

interface EnglishDictionaryResult {
    meanings: Meaning[];
    origin: string;
    phonetic: string;
    phonetics: IPhonetic[];
    word: string;
}

function isWordInfo(obj: WordInfo | Meaning): obj is WordInfo {
    return (obj as WordInfo).pos !== undefined;
}

function wordHasDefinitions(definitions: IPartsOfSpeech<IDefinition>): boolean {
    return Object.values(definitions).some((arr: IDefinition[]) => arr.length > 0);
}

async function getRawTranslationResults(text: string) {
    const yandexTranslationResult: Promise<YandexTranslationResult | null> = axios
        .get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${process.env.DICTIONARY_API_KEY}&lang=en-ru&text=${text}`)
        .then((response) => response.data as Promise<YandexTranslationResult>)
        .then((result) => {
            if (result.def.length === 0) {
                return null;
            }

            return result;
        })
        .catch((err) => {
            if (axios.isAxiosError(err)) {
                console.error(err.message);
            } else {
                console.error(err);
            }

            return null;
        });

    const englishDictionaryResult: Promise<EnglishDictionaryResult | null> = axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
        .then((response) => response.data as Promise<EnglishDictionaryResult[]>)
        .then((result) => result[0])
        .catch((err: Error | AxiosError) => {
            if (axios.isAxiosError(err)) {
                console.error(err.message);
            } else {
                console.error(err);
            }

            return null;
        });

    return await Promise.all([yandexTranslationResult, englishDictionaryResult]);
}

function getPartsOfSpeech<T extends string | IDefinition = string>(array: Array<WordInfo | Meaning>) {
    return array.reduce(
        (acc, curr) => {
            if (isWordInfo(curr)) {
                if (curr.pos in acc) {
                    (acc as IPartsOfSpeech)[curr.pos as keyof IPartsOfSpeech].push(...curr.tr.map((tr) => tr.text));
                }
            } else if (curr.partOfSpeech in acc) {
                (acc as IPartsOfSpeech<IDefinition>)[curr.partOfSpeech as keyof IPartsOfSpeech<IDefinition>].push(
                    ...curr.definitions.map(
                        (def) =>
                            ({
                                definition: def.definition,
                                example: def.example,
                            } as IDefinition)
                    )
                );
            }

            return acc;
        },
        {
            noun: [],
            verb: [],
            adjective: [],
            adverb: [],
            numerals: [],
            pronoun: [],
            participle: [],
        } as IPartsOfSpeech<T>
    );
}

function getFirstTranslations(translations: IPartsOfSpeech): string[] {
    const maxTranslations = 3;
    let foundTranslations = 0;
    const result = [];
    const values: string[][] = Object.values(translations);

    for (const translations of values) {
        for (const translation of translations) {
            if (foundTranslations === maxTranslations) {
                return result;
            }

            result.push(translation);
            foundTranslations++;
        }
    }

    return result;
}

async function translate(text: string) {
    const [rawYandexResult, rawEnglishDictResult] = await getRawTranslationResults(text);

    if (rawYandexResult === null) return null;

    const translations = getPartsOfSpeech(rawYandexResult.def);
    const firstTranslations = getFirstTranslations(translations);
    let phonetic = {} as IPhonetic;
    let definitions = {} as IPartsOfSpeech<IDefinition>;
    let hasDefinitions = false;

    if (rawEnglishDictResult !== null) {
        phonetic = rawEnglishDictResult.phonetics.find((ph) => ph.audio !== undefined) || rawEnglishDictResult.phonetics[0];
        definitions = getPartsOfSpeech<IDefinition>(rawEnglishDictResult.meanings);
        hasDefinitions = wordHasDefinitions(definitions);
    }

    return {
        source: text,
        translations,
        phonetic,
        definitions,
        firstTranslations,
        hasDefinitions,
    } as Partial<IWord>;
}

export default translate;
