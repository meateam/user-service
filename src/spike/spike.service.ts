import { audiance, grantType, spikeServiceURL } from '../config';
import * as grpc from 'grpc';
import { SpikeClient } from '../../proto/spike/generated/spike/spike_grpc_pb';
import { GetSpikeTokenRequest, SpikeToken } from '../../proto/spike/generated/spike/spike_pb';

/**
 * this class gets a token with scopes for the kartoffel authorization from the spike-service
 */
export default class Spike {
    /**
     * getToken gets a JWT token for Kartoffel, from spike service.
     * @returns a JWT token for kartoffel
     */
    public async getToken(): Promise<string> {
        const client: SpikeClient = new SpikeClient(spikeServiceURL, grpc.credentials.createInsecure());
        const req: GetSpikeTokenRequest = new GetSpikeTokenRequest();
        req.setAudience(audiance);
        req.setGrantType(grantType);

        return new Promise((resolve, reject) => {
            client.getSpikeToken(req , (err: grpc.ServiceError | null, response: SpikeToken) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response.getToken());
                }
            });
        });
    }
}
