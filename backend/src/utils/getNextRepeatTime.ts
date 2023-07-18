import { LearnFeedbacks } from '../controllers/words/types';

function getNextRepeatTime(feedback?: LearnFeedbacks) {
    const date = new Date();

    let days = 1;

    switch (feedback) {
        case LearnFeedbacks.EASY:
            days = 3;
            break;
        case LearnFeedbacks.NORMAL:
            days = 2;
            break;
        case LearnFeedbacks.HARD:
            days = 1;
            break;
    }

    date.setDate(date.getDate() + days);
    date.setHours(8);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return Math.floor(date.getTime() / 1000);
}

export default getNextRepeatTime;
