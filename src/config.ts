// Used for the APM agent
export const secretToken: string = process.env.APM_SECRET_TOKEN || '';
export const serviceName: string = process.env.US_APM_SERVICE_NAME || 'user-service';
export const verifyServerCert: boolean = process.env.ELASTIC_APM_VERIFY_SERVER_CERT === 'true';
export const apmURL: string = process.env.ELASTIC_APM_SERVER_URL || 'http://localhost:8200';
export const userQuotaLimit: string = process.env.USER_QUOTA_LIMIT || '10';

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

export const redisPort: number = parseInt(`${process.env.REDIS_URL}`, 10) || 6379;
export const redisHost: string = process.env.REDIS_HOST || '127.0.0.1';
