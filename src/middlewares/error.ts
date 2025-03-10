import { NextFunction, Request, Response } from 'express';
import { constants } from 'http2';

interface IError extends Error {
    statusCode?: number;
}

const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500, message } = err;
    console.log('Error:', { statusCode, message, err }); // Для отладки

    res
        .status(statusCode)
        .send({
            message: statusCode === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR 
            ? 'На сервере произошла ошибка' 
            : message,
    });
};

export default errorHandler;