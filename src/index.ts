import { Server } from './server';
import { RPC } from './utils/rpc.server';

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
    console.log('Starting RPC Server');

    const rpcPort = process.env.RPC_PORT || '50051';
    const rpcServer: RPC = new RPC(rpcPort);
    rpcServer.server.start();
    console.log('Starting server');
    const server: Server = Server.bootstrap();

    server.app.on('close', () => {
        console.log('Server closed');
    });
})();
