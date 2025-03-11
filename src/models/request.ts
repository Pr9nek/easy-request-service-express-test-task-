import mongoose, { Schema } from 'mongoose';
import { IRequest, RequestStatus } from '../types/types';

const requestSchema: Schema = new Schema(
    {
        text: { 
            type: String, 
            required: [true, 'Поле text является обязательным'] 
        },
        topic: { 
            type: String, 
            required: [true, 'Поле topic является обязательным'] 
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

const RequestModel = mongoose.model<IRequest>('Request', requestSchema);
export default RequestModel;