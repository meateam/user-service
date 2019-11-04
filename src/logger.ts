import * as winston from 'winston';
import * as os from 'os';
import * as grpc from 'grpc';
import * as WinstonElasticsearch from 'winston-elasticsearch';
import * as indexTemplateMapping from 'winston-elasticsearch/index-template-mapping.json';
import * as apm from 'elastic-apm-node';
import { confLogger, serviceName, debugMode } from './config';
import { statusToString, validateGrpcError } from './utils/grpc.status';
import { ApplicationError } from './utils/errors';
const Elasticsearch = require('winston-elasticsearch');

// index pattern for the logger
const indexPattern = `${confLogger.indexPrefix}-*`;

export const logger: winston.Logger = winston.createLogger({
    defaultMeta: { service: serviceName, hostname: os.hostname() },
});

// configure logger
const options: WinstonElasticsearch.ElasticsearchTransportOptions = {
    indexPrefix: confLogger.indexPrefix,
    level: 'verbose',
    clientOpts: confLogger.options,
    bufferLimit: 100,
    messageType: 'log',
    ensureMappingTemplate: true,
    mappingTemplate: { ...indexTemplateMapping, index_patterns: indexPattern },
};
const elasticsearch: WinstonElasticsearch.default = new Elasticsearch(options);
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
  // Console logs for debugging only.
    if (debugMode) {
        if (traceID) {
            console.log(`level: ${level}, message: ${message}, name: ${name}, traceID: ${traceID}, meta:`);
        } else {
            console.log(`level: ${level}, message: ${message}, name: ${name}, meta:`);
        }
        if (meta) {
            console.log(meta);
        }
    }
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
            const traceparent: grpc.MetadataValue[] = call.metadata.get('elastic-apm-traceparent');
            const transOptions = (traceparent.length > 0) ? { childOf: traceparent[0].toString() } : {};
            apm.startTransaction(`/user.UserService/${func.name}`, 'request', transOptions);
            const reqInfo: object = call.request;
            log(Severity.INFO, 'request', func.name, 'NONE', reqInfo);

            const res = await func(call, callback);
            apm.endTransaction(statusToString(grpc.status.OK));
            log(Severity.INFO, 'response', func.name, 'NONE', { res });
            callback(null, res);
        } catch (err) {
            const validatedErr : ApplicationError = validateGrpcError(err);
            log(Severity.ERROR, func.name, err.message);
            apm.endTransaction(validatedErr.name);
            callback(err);
        }
    };
}
