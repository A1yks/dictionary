import { Language, LearnFeedbacks } from 'types/common';

export type LearnWordsProps = {
    language: Language;
};

export type ButtonsLoading = {
    [LearnFeedbacks.EASY]: boolean;
    [LearnFeedbacks.NORMAL]: boolean;
    [LearnFeedbacks.HARD]: boolean;
};
