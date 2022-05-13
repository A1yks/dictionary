import { Router } from 'express';
import Language, { ILanguage } from '../../models/Language';
import { CustomRequest, CustomResponse } from '../../types/request';

const router = Router();

router.get('/get', async (req, res: CustomResponse) => {
    const languages = await Language.find({}).populate('words wordsToLearn');
    res.json({ success: true, data: languages });
});

router.post('/add', async (req: CustomRequest<{ languageName: string }>, res: CustomResponse) => {
    const { languageName } = req.body;
    const language = new Language({
        name: languageName,
        wordsLearned: 0,
        wordsToRepeat: [],
        words: [],
    });

    language.save((err, doc) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Произошла ошибка при добавлении нового языка' });
        }

        res.json({ success: true, data: doc });
    });
});

router.post('/delete', async (req: CustomRequest<{ id: string }>, res: CustomResponse) => {
    const { id } = req.body;

    try {
        const result = await Language.findByIdAndDelete(id);

        if (!result) {
            res.status(404).json({ success: false, message: 'Языка с переданным id не существует' });
        }

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Произошла ошибка при попытке удалить язык' });
    }
});

router.post('/edit', (req: CustomRequest<{ id: string; data: ILanguage }>, res: CustomResponse) => {
    const { id, data } = req.body;

    Language.findByIdAndUpdate(id, data, null, (err, doc) => {
        if (err || doc === null) {
            return res.status(500).json({ success: false, message: 'Произошла ошибка при попытке редактирования языка' });
        }

        res.json({ success: true });
    });
});

export default router;
