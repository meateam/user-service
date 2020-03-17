import { statusToString } from './grpc.status';
import * as grpc from 'grpc';
/**
 * This file contains extended errors for the application.
 */

export class ApplicationError extends Error {
    public code: number;
    public name: string;

    constructor(message?: string, code?: number) {
        super();

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || 'unknown application error';
        this.code = code || grpc.status.UNKNOWN;
        this.name = statusToString(this.code);
    }
}

export class ServerError extends ApplicationError {
    constructor(message?: string, code?: number) {
        super(message || 'server side error', code || grpc.status.UNKNOWN);
    }
}

export class ClientError extends ApplicationError {
    constructor(message?: string, code?: number) {
        super(message || 'client side error', code || grpc.status.INVALID_ARGUMENT);
    }
}

export class UserNotFoundError extends ClientError {
    constructor(message?: string) {
        super(message || 'The requested user was not found', grpc.status.NOT_FOUND);
    }
}

export class ProtoPullingError extends ApplicationError {
    constructor(message?: string) {
        super(message || 'Error with pulling spike proto', grpc.status.INTERNAL);
    }
}

export class FileError extends ApplicationError {
    constructor(message?: string) {
        super(message || 'Error with creating spike proto file', grpc.status.INTERNAL);
    }
}

export class SpikeError extends ApplicationError {
    constructor(message?: string) {
        super(message || 'Error contacting spike', grpc.status.INTERNAL);
    }
}

export class KartoffelError extends ApplicationError {
    constructor(message?: string) {
        super(message || 'Error contacting kartoffel', grpc.status.INTERNAL);
    }
}
