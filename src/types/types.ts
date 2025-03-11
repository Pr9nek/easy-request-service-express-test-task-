import { HydratedDocument } from 'mongoose';

export enum RequestStatus {
    NEW = 'Новое',
    IN_PROGRESS = 'В работе',
    COMPLETED = 'Завершено',
    CANCELLED = 'Отменено',
}
export interface IRequest {
    text: string;
    topic: string;
    status: RequestStatus;
    resolution?: string;
    cancellationReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type RequestDocument = HydratedDocument<IRequest>;
export interface CreateRequestBody {
    text: string;
    topic: string;
}
export interface CompleteRequestBody {
    resolution: string;
}
export interface CancelRequestBody {
    cancellationReason: string;
}
export interface FilterRequestsQuery {
    date?: string;
    startDate?: string;
    endDate?: string;
    limit?: string;
    skip?: string;
}
