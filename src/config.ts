export const serviceName: string = process.env.US_APM_SERVICE_NAME || 'user-service';

const esHost: string = process.env.LOGGER_ELASTICSEARCH || 'http://localhost:9200';
const esUser: string = process.env.ELASTICSEARCH_USER || '';
const esPass: string = process.env.ELASTICSEARCH_PASSWORD || '';
export const confLogger = {
    options: {
        hosts: esHost && esHost.split(','),
        // Might be auth instead, not sure.
        httpAuth: `${esUser}:${esPass}`,
    },
    indexPrefix: process.env.LOGGER_ELASTICSEARCH_PREFIX || 'kdrive',
};
