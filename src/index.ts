import * as apm from 'elastic-apm-node';
import * as redis from 'redis';
import * as Mongoose from 'mongoose';
import { RPC } from './rpc.server';
import { apmURL, verifyServerCert, serviceName, secretToken, redisPort, redisHost, mongoConnectionString } from './config';

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

async function connectToMongo() {
    console.log(`connecting to: ${mongoConnectionString}`);
    await Mongoose.connect(
        mongoConnectionString,
        { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false },
        async (err) => {
            if (!err) {
                console.log(`successfully connected: ${mongoConnectionString}`);
            } else {
                console.log(`did not connect! ${mongoConnectionString}`);
                console.log(err);
            }
        });
}

(async () => {
    await connectToMongo();
    const redisClient = connectToRedis();
    const rpcPort = process.env.RPC_PORT || '8086';
    const rpcServer: RPC = new RPC(rpcPort, redisClient);
    rpcServer.server.start();
    console.log(`RPC Server listening on port ${rpcPort}`);
})();
