import API from 'api';
import { LearnFeedbacks, WordInfo, Word } from 'types/common';
import { DeleteWordsRes, GetWordsRes, GetWordsToLearnRes, LearnWordRes, SearchWordsRes } from './types';

class WordsAPI {
    async translateWord(word: string) {
        return await API<WordInfo>(`/words/translate/${word.trim()}`);
    }

    async getWords(dictId: string, limit?: number, offset?: number) {
        return await API<GetWordsRes>('/words', { params: { dictId, limit, offset } });
    }

    async getWordsToLearn(dictId: string, limit?: number, offset?: number) {
        return await API<GetWordsToLearnRes>('/words/learn', { params: { dictId, limit, offset } });
    }

    async addWord(dictId: string, word: WordInfo) {
        return await API<Word>('/words/add', { method: 'POST', data: { dictId, word } });
    }

    async deleteWords(dictId: string, words: Word[]) {
        return await API<DeleteWordsRes>('/words/delete', { method: 'DELETE', data: { dictId, words } });
    }

    async learnWord(wordId: string, feedback: LearnFeedbacks) {
        return await API<LearnWordRes>('/words/learn', { method: 'PATCH', data: { wordId, feedback } });
    }

    async searchWords(dictId: string, word: string, limit?: number, offset?: number) {
        return await API<SearchWordsRes>('/words/search', { params: { dictId, word, limit, offset } });
    }
}

export default new WordsAPI();
