import { RPC } from './rpc.server';
import * as apm from 'elastic-apm-node';
// const apm = require('elastic-apm-node');
import { apmURL, verifyServerCert, serviceName, secretToken } from './config';
const options = {
    serviceName,
    secretToken,
    verifyServerCert,
    serverUrl: apmURL,
};
console.log(options);
apm.start(options);

process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('User Termination');
    process.exit(0);
});

(async () => {
    const rpcPort = process.env.RPC_PORT || '8086';
    const rpcServer: RPC = new RPC(rpcPort);
    rpcServer.server.start();
    console.log(`RPC Server listening on port ${rpcPort}`);
})();
