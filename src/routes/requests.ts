import { Router } from 'express';
import {
    createRequest,
    takeRequestInProgress,
    completeRequest,
    cancelRequest,
    getRequests,
    cancelAllInProgress,
} from '../controllers/requests';
import {
    validateCreateRequest,
    validateCompleteRequest,
    validateCancelRequest,
    validateFilterRequests,
    validateRequestInProgress,
} from '../middlewares/validation';

const router = Router();

// Создать новое обращение
router.post('/', validateCreateRequest, createRequest);

// Взять обращение в работу
router.patch('/:id/in-progress', validateRequestInProgress, takeRequestInProgress);

// Завершить обращение
router.patch('/:id/complete', validateCompleteRequest, completeRequest);

// Отменить обращение
router.patch('/:id/cancel', validateCancelRequest, cancelRequest);

// Получить список обращений с фильтрацией
router.get('/', validateFilterRequests, getRequests);

// Отменить все обращения "в работе"
router.patch('/cancel-all-in-progress', cancelAllInProgress);

export default router;