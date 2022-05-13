import { CronJob } from 'cron';
import Language from '../models/Language';

async function giveWordsToRepeat() {
    try {
        // const wordsToRepeat = await Language.fi
    } catch (err) {
        console.error(err);
    }
}

const job = new CronJob('0 8 * * * *', giveWordsToRepeat);

job.start();
