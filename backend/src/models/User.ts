import { model, Model, Schema, Types } from 'mongoose';
import transformObject from '../utils/transformObject';
import { ILanguage } from './Language';

export interface IUser {
    id: Types.ObjectId;
    login: string;
    password: string;
    languages: Types.DocumentArray<ILanguage>;
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
            transform: transformObject,
        },
    }
);

export default model<IUser>('User', userSchema);
