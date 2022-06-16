import { Model, model, Schema } from 'mongoose';
import schemaQueryHandler from '../utils/schemaQueryHandler';
import transformObject from '../utils/transformObject';
import User from './User';
import Word, { IWord } from './Word';

export interface ILanguage {
    name: string;
    wordsLearned: number;
    words: IWord[];
    wordsToLearn: IWord[];
    userId: Schema.Types.ObjectId;
}

const languageSchema = new Schema<ILanguage, Model<ILanguage>>(
    {
        name: { type: String, required: true },
        wordsLearned: { type: Number, default: 0 },
        words: { type: [{ type: Schema.Types.ObjectId, ref: 'Word' }], default: [] },
        wordsToLearn: { type: [{ type: Schema.Types.ObjectId, ref: 'Word' }], default: [] },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        collection: 'languages',
        toJSON: { virtuals: true, transform: transformObject },
    }
);

schemaQueryHandler<ILanguage>(languageSchema, 'findOneAndDelete', async function (document) {
    await Promise.all([
        User.findByIdAndUpdate(document.userId, { $pull: { languages: document._id } }),
        Word.deleteMany({ _id: { $in: document.words } }),
    ]);
});

export default model<ILanguage>('Language', languageSchema);
