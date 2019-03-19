import * as express from 'express';
import { ServerError, UserError } from './applicationError';

export function userErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof UserError) {
        console.log(
            'User Error',
            `${error.name} was thrown with status ${error.status} and message ${error.message}`);

        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function serverErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (error instanceof ServerError) {
        console.log(
            'Server Error',
            `${error.name} was thrown with status ${error.status} and message ${error.message}`);

        res.status(error.status).send({
            type: error.name,
            message: error.message,
        });

        next();
    } else {
        next(error);
    }
}

export function unknownErrorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(
        'Unknown Error',
        `${error.name} was thrown with status 500 and message ${error.message}`);

    res.status(500).send({
        type: error.name,
        message: error.message,
    });

    next(error);
}
