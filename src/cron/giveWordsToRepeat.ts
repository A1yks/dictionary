import { CronJob } from 'cron';

async function giveWordsToRepeat() {
    try {
        // const wordsToRepeat = await Language.fi
    } catch (err) {
        console.error(err);
    }
}

const job = new CronJob('0 8 * * * *', giveWordsToRepeat);

job.start();
