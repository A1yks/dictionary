import { PartsOfSpeech } from './common';

export type TranslatedPartfsOfSpeech = {
	[key in keyof PartsOfSpeech]: string;
};

export const translatedPartsOfSpeech: TranslatedPartfsOfSpeech = {
	noun: 'Существительное',
	adjective: 'Прилагательное',
	adverb: 'Наречие',
	numerals: 'Числительные',
	participle: 'Причастие',
	pronoun: 'Местоимение',
	verb: 'Глагол',
};
