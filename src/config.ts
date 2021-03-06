// Used for the APM agent
export const secretToken: string = process.env.APM_SECRET_TOKEN || '';
export const serviceName: string = process.env.US_APM_SERVICE_NAME || 'user-service';
export const verifyServerCert: boolean = process.env.ELASTIC_APM_VERIFY_SERVER_CERT === 'true';
export const apmURL: string = process.env.ELASTIC_APM_SERVER_URL || 'http://localhost:8200';
export const userQuotaLimit: string = process.env.USER_QUOTA_LIMIT || '10';

export const audiance: string = process.env.USER_KARTOFFEL_AUDIENCE || 'kartoffel';
export const grantType: string = process.env.GRANT_TYPE || 'client_credentials';

export const spikeServiceURL: string = process.env.SPIKE_SERVICE_URL || 'spike-service:8080';
export const kartoffelQuery: string = `/search?domainusers.datasource=${
  process.env.DOMAINUSERS_QUERY || 'nonExternals'
}`;
export const kartoffelURL: string = `${process.env.KARTOFFEL_URL || 'http://localhost:3001'}/api/persons`;
export const kartoffelCTSQuerySearch: string = `/search?domainusers.datasource=${
  process.env.USER_KARTOFFEL_CTS_DATASOURCE || 'dataSource1'
}`;
export const kartoffelCTSQueryGet: string = '/domainUser';
export const ctsDatasource: string = process.env.USER_KARTOFFEL_CTS_DATASOURCE || 'dataSource1';
export const phoneBookURL: string = `${process.env.PHONE_BOOK_URL || 'http://localhost'}:${
  process.env.PHONE_BOOK_PORT || '80'
}`;

export const debugMode: boolean = process.env.DEBUG_MODE === 'true';

export const tomcalDest: string = process.env.GW_TOMCAL_DEST_VALUE || 'TOMCAL';
export const ctsDest: string = process.env.GW_CTS_DEST_VALUE || 'CTS';

const esHost: string = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const esUser: string = process.env.ELASTICSEARCH_USER || '';
const esPass: string = process.env.ELASTICSEARCH_PASSWORD || '';
export const confLogger = {
    options: {
        hosts: esHost && esHost.split(','),
    // Might be auth instead, not sure.
        httpAuth: `${esUser}:${esPass}`,
    },
    indexPrefix: process.env.LOG_INDEX || 'kdrive',
};
