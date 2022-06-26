import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentsRouter from './routes/students.js';
import cors from 'cors';
import cloudinary from 'cloudinary';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to DB'));

app.use(
    cors({
        origin: "*"
    })
)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

app.use(express.json({ limit: '25mb' }));
app.use('/api/students', studentsRouter)

app.listen(PORT, () => console.log('Server Started!'))