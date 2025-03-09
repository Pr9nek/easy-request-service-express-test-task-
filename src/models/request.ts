import mongoose, { Schema, Document } from 'mongoose';

export enum RequestStatus {
    NEW = 'Новое',
    IN_PROGRESS = 'В работе',
    COMPLETED = 'Завершено',
    CANCELLED = 'Отменено',
}

interface IRequest extends Document {
    text: string;
    topic: string;
    status: RequestStatus;
    resolution?: string;
    cancellationReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

const requestSchema: Schema = new Schema(
    {
        text: { 
            type: String, 
            required: [true, 'Поле name является обязательным'] 
        },
        topic: { 
            type: String, 
            required: [true, 'Поле name является обязательным'] 
        },
        status: {
            type: String,
            enum: Object.values(RequestStatus),
            default: RequestStatus.NEW,
        },
        resolution: { type: String },
        cancellationReason: { type: String },
        createdAt: { 
            type: Date, 
            default: Date.now },
        updatedAt: { 
            type: Date, 
            default: Date.now },
    },
    { versionKey: false }
);

export default mongoose.model<IRequest>('Request', requestSchema);