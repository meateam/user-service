import { RPC } from './rpc.server';

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
