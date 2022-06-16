import { model, Model, Schema } from 'mongoose';
import transformObject from '../utils/transformObject';
import { ILanguage } from './Language';

export interface IUser {
    login: string;
    password: string;
    languages: ILanguage[];
}

const userSchema = new Schema<IUser, Model<IUser>>(
    {
        login: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        languages: { type: [{ type: Schema.Types.ObjectId, ref: 'Language' }], default: [] },
    },
    {
        collection: 'users',
        toJSON: {
            transform(doc: any, ret: Partial<IUser>) {
                delete ret.password;
                transformObject(doc, ret);
            },
        },
    }
);

export default model<IUser>('User', userSchema);
