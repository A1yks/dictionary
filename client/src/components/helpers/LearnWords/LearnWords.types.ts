import { LearnFeedbacks } from 'types/common';

export type ButtonsLoading = {
    [LearnFeedbacks.EASY]: boolean;
    [LearnFeedbacks.NORMAL]: boolean;
    [LearnFeedbacks.HARD]: boolean;
};
