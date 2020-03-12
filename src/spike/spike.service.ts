import { SpikeError } from '../utils/errors';

const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const PROTO_PATH =  `${__dirname}/../../proto/spike.proto`;
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

export default class Spike {

    public async getToken() {

        const client = await new spike_proto.Spike('spike-service:8080', grpc.credentials.createInsecure());

        return this.getSpikeToken(client);
    }

    private getSpikeToken(client: any) {
        const reqBody = {
            grant_type: 'client_credentials',
            audience: 'kartoffel',
        };

        return new Promise((resolve, reject) => {
            client.GetSpikeToken(reqBody, function (err: Error, response: any) {
                if (err) {
                    throw new SpikeError(`Error contacting spike: ${err}`);
                } else {
                    resolve(response.token);
                }
            });
        });
    }
}
