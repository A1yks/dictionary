import { Word } from 'types/common';

export type WordListItemProps = {
    wordInfo: Word | null;
    loading?: boolean;
    showActions?: boolean;
    showTranslation?: boolean;
    className?: string;
    showTranscription?: boolean;
};
