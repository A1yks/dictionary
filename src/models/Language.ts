import { Model, model, Schema } from 'mongoose';
import schemaQueryHandler from '../utils/schemaQueryHandler';
import transformObject from '../utils/transformObject';
import Word, { IWord } from './Word';

export interface ILanguage {
    name: string;
    wordsLearned: number;
    words: IWord[];
    wordsToLearn: IWord[];
}

const languageSchema = new Schema<ILanguage, Model<ILanguage>>(
    {
        name: { type: String, required: true },
        wordsLearned: { type: Number, default: 0 },
        words: { type: [{ type: Schema.Types.ObjectId, ref: 'Word' }], default: [] },
        wordsToLearn: { type: [{ type: Schema.Types.ObjectId, ref: 'Word' }], default: [] },
    },
    {
        collection: 'languages',
        toJSON: { virtuals: true, transform: transformObject },
    }
);

schemaQueryHandler<ILanguage>(languageSchema, 'findOneAndDelete', async function (document) {
    await Word.deleteMany({ _id: { $in: document.words } });
});

export default model<ILanguage>('Language', languageSchema);
