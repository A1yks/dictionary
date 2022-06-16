import { WordInfo, Word } from 'types/common';

export type WordListItemProps = {
    wordInfo: WordInfo | Word | null;
    loading?: boolean;
    showActions?: boolean;
    showTranslation?: boolean;
    className?: string;
    showTranscription?: boolean;
};
