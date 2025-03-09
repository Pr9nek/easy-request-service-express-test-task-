import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import exp from "constants";

// Загружаем переменные из .env
dotenv.config();

// Используем переменные из окружения
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/requests_db';

const app = express();
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    
        app.listen(PORT, () => {    
            console.log(`Server running on port ${PORT}`);
        });
    })  
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});
