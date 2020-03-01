import * as apm from 'elastic-apm-node';
import * as redis from 'redis';
import * as Mongoose from 'mongoose';
import { HealthCheckResponse } from 'grpc-ts-health-check';
import { RPC, serviceNames } from './rpc.server';
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
    log(Severity.ERROR, 'User Termination', 'SIGINT');
    process.exit(0);
});

function connectToRedis(): redis.RedisClient {
    const client = redis.createClient(redisPort, redisHost);
    client.on('error', function (err: ErrorEvent) {
        log(Severity.ERROR, `error while connecting to redis: ${err}`, 'connectToRedis');
    });
    return client;
}

async function connectToMongo(server: RPC) {
    log(Severity.INFO, `connecting to mongo: ${mongoConnectionString}`, 'connectToMongo');
    try {
        const db = await Mongoose.connect(
            mongoConnectionString,
            { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
        db.connection.on('connected', () => {
            setHealthStatus(server, HealthCheckResponse.ServingStatus.SERVING);
        });
        db.connection.on('error', (err) => {
            setHealthStatus(server, HealthCheckResponse.ServingStatus.NOT_SERVING);
        });
        db.connection.on('disconnected', () => {
            setHealthStatus(server, HealthCheckResponse.ServingStatus.NOT_SERVING);
        });
    } catch (err) {
        log(Severity.ERROR, `did not connect to ${mongoConnectionString}. error: ${err}`, 'connectToMongo', undefined, err);
        setHealthStatus(server, HealthCheckResponse.ServingStatus.NOT_SERVING);
        return;
    }

    log(Severity.INFO, `successfully connected: ${mongoConnectionString}`, 'connectToMongo');
    setHealthStatus(server, HealthCheckResponse.ServingStatus.SERVING);
}

(async () => {
    const redisClient = connectToRedis();
    const rpcPort = process.env.RPC_PORT || '8086';
    const rpcServer: RPC = new RPC(rpcPort, redisClient);
    await connectToMongo(rpcServer);
    rpcServer.server.start();
    log(Severity.INFO, `RPC Server listening on port ${rpcPort}`, 'index');
})();

function setHealthStatus(server: RPC, status: number) : void {
    for (let i = 0 ; i < serviceNames.length ; i++) {
        server.grpcHealthCheck.setStatus(serviceNames[i], status);
    }
}
