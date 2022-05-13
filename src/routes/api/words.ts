import { Router } from 'express';
import LanguageNotFoundError from '../../errors/api/languages/LanguageNotFoundError';
import WordAlreadyAddedError from '../../errors/api/words/WordAlreadyAddedError';
import WordNotAddedError from '../../errors/api/words/WordNotAddedError';
import Language from '../../models/Language';
import Word, { IWord } from '../../models/Word';
import { CustomRequest, CustomResponse } from '../../types/request';
import translate from '../../utils/translate';

const router = Router();

router.get('/search/:word(*)', async (req, res: CustomResponse) => {
    if (req.params.word === '') {
        return res.json({ success: false, message: 'Не удалось найти искомое слово' });
    }

    const word = req.params.word;
    const translation = await translate(word);

    if (translation === null) {
        return res.status(404).json({ success: false, message: 'Не удалось найти искомое слово' });
    }

    res.status(200).json({ success: true, data: translation });
});

router.post('/add', async (req: CustomRequest<{ langId: string; word: IWord }>, res: CustomResponse) => {
    const { langId, word } = req.body;

    try {
        const language = await Language.findById(langId);

        if (language === null) {
            throw new LanguageNotFoundError();
        }

        const currWord = await Word.findOne({ language: langId, source: word.source.toLowerCase() });

        if (currWord !== null) {
            throw new WordAlreadyAddedError();
        }

        const newWord = new Word(word);

        newWord.language = language._id;
        language.words.push(newWord._id);
        await Promise.all([language.save(), newWord.save()]);
        res.json({ success: true });
    } catch (err) {
        if (err instanceof WordAlreadyAddedError) {
            return res.status(403).json({ success: false, message: 'Такое слово уже добавлено' });
        }

        if (err instanceof LanguageNotFoundError) {
            return res.status(404).json({ success: false, message: 'Не удалось найти словарь, в который необходимо добавить слово' });
        }

        return res.status(500).json({ success: false, message: 'Произошла ошибка при добавлении нового слова' });
    }
});

router.post('/delete', async (req: CustomRequest<{ langId: string; words: IWord[] }>, res: CustomResponse) => {
    const { langId, words } = req.body;

    try {
        const wordIds = words.map((word) => word.id);

        // for (const word of words) {
        //     const langHasWord = !!language.words.find(({ source }) => word === source);

        //     if (!langHasWord) {
        //         throw new WordNotAddedError();
        //     }
        // }

        // await language.updateOne({ $pull: { words: { source: { $in: words } }, wordsToLearn: { source: { $in: words } } } });

        const result = await Word.deleteMany({ _id: { $in: wordIds } });

        if (!result) {
            return res.status(404).json({ success: false, message: 'Удаляемое слово не было найдено' });
        }

        const language = await Language.findById(langId).populate('words wordsToLearn');

        if (language === null) {
            throw new LanguageNotFoundError();
        }

        res.status(200).json({ success: true, data: { words: language.words, wordsToLearn: language.wordsToLearn } });
    } catch (err) {
        console.error(err);
        if (err instanceof LanguageNotFoundError) {
            return res.status(404).json({ success: false, message: 'Не удалось найти словарь, из которого необходимо удалить слово' });
        }

        if (err instanceof WordNotAddedError) {
            return res.status(404).json({ success: false, message: 'Удаляемое слово не найдено' });
        }

        res.status(500).json({ success: false, message: 'Произошла ошибка при попытке удалить слово' });
    }
});

export default router;
