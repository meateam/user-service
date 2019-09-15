import * as winston from 'winston';
import * as os from 'os';
// import * as Elasticsearch from 'winston-elasticsearch';
const Elasticsearch = require('winston-elasticsearch');
import * as grpc from 'grpc';
import { confLogger, serviceName } from './config';

// index pattern for the logger
const indexTemplateMapping = require('winston-elasticsearch/index-template-mapping.json');
indexTemplateMapping.index_patterns = `${confLogger.indexPrefix}-*`;

export const logger: winston.Logger = winston.createLogger({
    defaultMeta: { service: serviceName, hostname: os.hostname() },
});

// configure logger
const elasticsearch = new Elasticsearch({
    indexPrefix: confLogger.indexPrefix,
    level: 'verbose',
    clientOpts: confLogger.options,
    bufferLimit: 100,
    messageType: 'log',
    ensureMappingTemplate: true,
    mappingTemplate: indexTemplateMapping,
});
logger.add(elasticsearch);

/**
 * logs the data with its given parameters.
 * @param severity - the kind of log created.
 * @param name - name of the log. in our case, the function called.
 * @param description - description in text.
 * @param traceID - id to correlate to if there are several logs with some connection.
 * @param user - the user requesting for the service.
 * @param meta - additional optional information.
 */
export const log = (level: Severity, message: string, name: string, traceID?: string, meta?: object) => {
    logger.log(level, message, { ...meta, traceID, method: name });
};

export enum Severity {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly',
}

  /**
   * wraps all of the service methods, creating the transaction for the apm and the logger,
   * and sends them to the elastic server.
   * @param func - the method called and wrapped.
   */
export function wrapper(func: Function) :
  (call: grpc.ServerUnaryCall<Object>, callback: grpc.requestCallback<Object>) => Promise<void> {
    return async (call: grpc.ServerUnaryCall<Object>, callback: grpc.requestCallback<Object>) => {
        try {
            const reqInfo: object = call.request;
            log(Severity.INFO, 'request', func.name, 'NONE', reqInfo);

            const res = await func(call, callback);
            log(Severity.INFO, 'response', func.name, 'NONE', { res });
            callback(null, res);
        } catch (err) {
            log(Severity.ERROR, func.name, err.message);
            callback(err);
        }
    };
}
