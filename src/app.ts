import express from 'express';
import requestRoutes from './routes/requests';
import { errors } from 'celebrate';
import errorHandler from './middlewares/error';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();

// Логирование всех входящих запросов
app.use(requestLogger);

// Парсинг JSON в теле запроса
app.use(express.json());

// Подключение маршрутов для обращений
app.use('/requests', requestRoutes);

// Обработка ошибок валидации от celebrate
app.use(errors());

// Логирование ошибок
app.use(errorLogger);

// Глобальный обработчик ошибок
app.use(errorHandler);

export default app;