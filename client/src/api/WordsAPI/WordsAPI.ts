import API from 'api';
import { Word } from 'types/common';
import { DeleteWordsRes } from './types';

class WordsAPI {
    async translateWord(word: string) {
        return await API<Word>(`/words/translate/${word.trim()}`);
    }

    async addWord(langId: string, word: Word) {
        return await API<Word>('/words/add', { method: 'POST', data: { langId, word } });
    }

    async deleteWords(langId: string, words: Word[]) {
        return await API<DeleteWordsRes>('/words/delete', { method: 'DELETE', data: { langId, words } });
    }
}

export default new WordsAPI();
