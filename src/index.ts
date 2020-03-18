import * as apm from 'elastic-apm-node';
import { HealthCheckResponse } from 'grpc-ts-health-check';
import { startServer } from './rpc.server';
import { apmURL, verifyServerCert, serviceName, secretToken } from './config';
import { log, Severity } from './logger';

apm.start({
    serviceName,
    secretToken,
    verifyServerCert,
    serverUrl: apmURL,
});

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    log(Severity.ERROR, 'User Termination', 'SIGINT');
    process.exit(0);
});

(async () => {
    const rpcPort = process.env.RPC_PORT || '8086';
    startServer(rpcPort);
    // setHealthStatus(rpcServer, HealthCheckResponse.ServingStatus.SERVING);
    log(Severity.INFO, `RPC Server listening on port ${rpcPort}`, 'index');
})();

// function setHealthStatus(server: RPC, status: number): void {
//     for (let i = 0; i < serviceNames.length; i++) {
//         server.grpcHealthCheck.setStatus(serviceNames[i], status);
//     }
// }
