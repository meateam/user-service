import { RPC } from './rpc.server';
import * as apm from 'elastic-apm-node';
import * as redis from 'redis';
import { apmURL, verifyServerCert, serviceName, secretToken, redisPort, redisHost } from './config';

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
    console.log('User Termination');
    process.exit(0);
});

function connectToRedis(): redis.RedisClient {
    const client = redis.createClient(redisPort, redisHost);
    client.on('error', function (err: ErrorEvent) {
        console.log(`Error: ${err}`);
    });
    return client;
}

(async () => {
    const redisClient = connectToRedis();
    const rpcPort = process.env.RPC_PORT || '8086';
    const rpcServer: RPC = new RPC(rpcPort, redisClient);
    rpcServer.server.start();
    console.log(`RPC Server listening on port ${rpcPort}`);
})();
