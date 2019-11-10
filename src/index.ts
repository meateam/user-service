import * as apm from 'elastic-apm-node';
import * as redis from 'redis';
import * as Mongoose from 'mongoose';
import { RPC } from './rpc.server';
import { apmURL, verifyServerCert, serviceName, secretToken, redisPort, redisHost, mongoConnectionString } from './config';
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
    console.log('User Termination');
    process.exit(0);
});

function connectToRedis(): redis.RedisClient {
    const client = redis.createClient(redisPort, redisHost);
    client.on('error', function (err: ErrorEvent) {
        log(Severity.ERROR, `error while connecting to redis: ${err}`, 'connectToRedis');
    });
    return client;
}

async function connectToMongo() {
    log(Severity.INFO, `connecting to mongo: ${mongoConnectionString}`, 'connectToMongo');
    await Mongoose.connect(
        mongoConnectionString,
        { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },
        async (err) => {
            if (!err) {
                log(Severity.INFO, `successfully connected: ${mongoConnectionString}`, 'connectToMongo');
            } else {
                log(Severity.ERROR, `did not connect to ${mongoConnectionString}. error: ${err}`, 'connectToMongo', undefined, err);
            }
        });
}

(async () => {
    await connectToMongo();
    const redisClient = connectToRedis();
    const rpcPort = process.env.RPC_PORT || '8086';
    const rpcServer: RPC = new RPC(rpcPort, redisClient);
    rpcServer.server.start();
    log(Severity.INFO, `RPC Server listening on port ${rpcPort}`, 'index');
})();
