import API from 'api';
import { LearnFeedbacks, WordInfo, Word } from 'types/common';
import { DeleteWordsRes, LearnWordRes } from './types';

class WordsAPI {
    async translateWord(word: string) {
        return await API<WordInfo>(`/words/translate/${word.trim()}`);
    }

    async addWord(langId: string, word: WordInfo) {
        return await API<Word>('/words/add', { method: 'POST', data: { langId, word } });
    }

    async deleteWords(langId: string, words: Word[]) {
        return await API<DeleteWordsRes>('/words/delete', { method: 'DELETE', data: { langId, words } });
    }

    async learnWord(wordId: string, feedback: LearnFeedbacks) {
        return await API<LearnWordRes>('/words/learn', { method: 'PATCH', data: { wordId, feedback } });
    }
}

export default new WordsAPI();
