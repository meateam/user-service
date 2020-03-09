import path from 'path';

const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const PROTO_PATH = path.resolve("../proto/spike.proto");
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
const spike_proto = grpc.loadPackageDefinition(packageDefinition).spike;

export default function getToken() {
    const reqBody = {
        grant_type: "client_credentials",
        audience: "kartoffel"
    }
    const client = new spike_proto.Spike('localhost:8080',
        grpc.credentials.createInsecure());
    client.getSpikeToken(reqBody, function (err: Error, response: any) {
        console.log(response);
        return response;
    });
}
