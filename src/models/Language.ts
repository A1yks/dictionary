import { HydratedDocument, Model, model, Query, Schema } from 'mongoose';
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
        name: String,
        wordsLearned: Number,
        words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
        wordsToLearn: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
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
