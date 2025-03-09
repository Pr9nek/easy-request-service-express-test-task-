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
}