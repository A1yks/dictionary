import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import languagesRoutes from './routes/languages';
import wordsRoutes from './routes/words';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import path from 'path';

dotenv.config({ path: path.resolve('./backend/.env') });

if (!process.env.DB_CONNECT) throw new Error('DB_CONNECT is undefined');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/languages', languagesRoutes);
app.use('/api/words', wordsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log('Connected to db'))
    .catch(console.error);

app.listen(process.env.PORT || 3001, async () => {
    console.log('Server running on port ' + process.env.PORT);
});
