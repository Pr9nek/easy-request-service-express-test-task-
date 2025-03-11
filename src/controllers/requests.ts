import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import BadRequestError from '../errors/badRequestError';
import NotFoundError from '../errors/notFoundError';
import RequestModel from '../models/request';
import { RequestStatus } from '../types/types';
import { RequestDocument } from '../types/types';
import { FilterQuery } from 'mongoose';
import { CreateRequestBody, CompleteRequestBody, CancelRequestBody, FilterRequestsQuery } from '../types/types';
import { constants } from 'http2';
import getDayRange from '../utils/utils';

export const createRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { text, topic } = req.body as CreateRequestBody;
        const request = await RequestModel.create({ text, topic });
        res
            .status(constants.HTTP_STATUS_CREATED)
            .json(request);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return next(new BadRequestError('Некорректные данные при создании обращения'));
        }
        return next(error);
    }
};

export const takeRequestInProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = await RequestModel.findByIdAndUpdate(
            req.params.id,
            { status: RequestStatus.IN_PROGRESS, updatedAt: new Date() },
            { new: true } 
        );  
        if (!request) {
            throw new NotFoundError('Обращение не найдено');
        }
        res
            .status(constants.HTTP_STATUS_OK)
            .json(request);
    } catch (error) {
        return next(error);
    }
};

export const completeRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { resolution } = req.body as CompleteRequestBody;
        const request = await RequestModel.findByIdAndUpdate(
            req.params.id,
            { status: RequestStatus.COMPLETED, resolution, updatedAt: new Date() },
            { new: true }
        );
        if (!request) {
            throw new NotFoundError('Обращение не найдено');
        }
        res
            .status(constants.HTTP_STATUS_OK)
            .json(request);
    } catch (error) {
        return next(error);
    }
};

export const cancelRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cancellationReason } = req.body as CancelRequestBody;
        const request = await RequestModel.findByIdAndUpdate(
            req.params.id,
            { status: RequestStatus.CANCELLED, cancellationReason, updatedAt: new Date() },
            { new: true }
        );
        if (!request) {
            throw new NotFoundError('Обращение не найдено');
        }
        res
            .status(constants.HTTP_STATUS_OK)
            .json(request);
    } catch (error) {
        return next(error);
    }
};

export const getRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, startDate, endDate, limit = '10', skip = '0' } = req.query as FilterRequestsQuery;
        const query: FilterQuery<RequestDocument> = {};

        if (date) {
            const { start, end } = getDayRange(date);
            query.createdAt = { 
                $gte: start, 
                $lte: end 
                };
            
        } else if (startDate && endDate) {
            const { start } = getDayRange(startDate);
            const { end } = getDayRange(endDate);
            query.createdAt = { 
                $gte: start, 
                $lte: end 
                };
            };

        const requests = await RequestModel.find(query)
            .limit(parseInt(limit))
            .skip(parseInt(skip));
        res.status(constants.HTTP_STATUS_OK).json(requests);
    } catch (error) {
        return next(error);
    }
};

export const cancelAllInProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await RequestModel.updateMany(
            { status: RequestStatus.IN_PROGRESS },
            { status: RequestStatus.CANCELLED, cancellationReason: 'Mass cancellation', updatedAt: new Date() }
        );
        res
            .status(constants.HTTP_STATUS_OK)
            .json({ message: `Cancelled ${result.modifiedCount} requests` });
    } catch (error) {
        return next(error);
    }
};