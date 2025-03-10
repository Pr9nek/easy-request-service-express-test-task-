import { constants } from 'http2';

export default class ServerError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
        this.name = 'ServerError';
    }
}