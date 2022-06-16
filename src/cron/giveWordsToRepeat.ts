import { CronJob } from 'cron';
import Word from '../models/Word';

async function giveWordsToRepeat() {
    // const currTime = Math.trunc(Date.now() / 1000);

    try {
        // const wordsToRepeat = await Word.find({repeatAt: {$gte: currTime}});
    } catch (err) {
        console.error(err);
    }
}

const job = new CronJob('0 8 * * * *', giveWordsToRepeat);

job.start();
