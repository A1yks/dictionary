import { Word, WordInfo } from './common';

export function isWord(word: Word | WordInfo): word is Word {
    return (word as Word)._id !== undefined;
}
