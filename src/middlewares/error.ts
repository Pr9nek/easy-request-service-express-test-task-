import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';

interface IError extends Error {
    status?: number;
}

const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message } = err;

    res
        .status(status)
        .send({
            message: status === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR 
            ? 'На сервере произошла ошибка' 
            : message,
    });
};

export default errorHandler;