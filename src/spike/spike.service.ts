import axios, { AxiosResponse } from 'axios';
import * as https from 'https';
import { RedisClient } from 'redis';
import { promisify } from 'util';
import SpikeToken from './spike.token.interface';
import { tokenModel, IToken } from './spike.model';
import { log, Severity } from '../logger';

export default class Spike {
    private redis: RedisClient;
    private spikeId: string;
    private spikeSecret: string;
    private spikeURL: string;
    private getAsyncRedis: any;

    /**
     * @param redisInstance - Redis instance to get\set token from redis service
     */
    constructor(redis: RedisClient) {
        this.redis = redis;
        this.getAsyncRedis = promisify(this.redis.get).bind(this.redis);
        this.spikeId =  process.env.SPIKE_CLIENT_ID || '';
        this.spikeSecret = process.env.SPIKE_CLIENT_SECRET || '';
        this.spikeURL = process.env.SPIKE_TOKEN_URL || '';
    }

    /**
     * Renews the kartoffel token from spike
     */
    private async renewToken(): Promise<SpikeToken> {
        // For when the Spike's https certificate is self signed.
        const authorizationValue:string = Buffer.from(`${this.spikeId}:${this.spikeSecret}`).toString('base64');

        const res: AxiosResponse = await axios({
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            method: 'post',
            url: this.spikeURL,
            data: {
                grant_type: 'client_credentials',
                audience: 'kartoffel',
            },
            headers: { Authorization: `Basic ${authorizationValue}` },
        });
        return res.data;
    }

    /**
     * Returns a kartoffel token saved in redis or from spike
     */
    public async getToken (): Promise<string> {
        let kartoffelToken:string|null = await this.getAsyncRedis('kartoffel:token');
        // If the token is not in redis - either because we didn't save it yet or it has been expired
        if (!kartoffelToken) {
            log(Severity.INFO, 'failed to get token from redis. checking mongo.', 'getToken');
            try {
            // Check if the token exists in mongo
                const tokenObject : IToken | null = await tokenModel.findOne({ id: 'Kartoffel' }).exec();
                if (!tokenObject) {
                    log(Severity.INFO, 'failed to get token from mongo. fetching from kartoffel.', 'getToken');
                    let spikeRes: SpikeToken;
                    spikeRes = await this.renewToken();
                    const tokenExp: number = parseInt(spikeRes.expires_in, 10);
                    this.redis.set('kartoffel:token', spikeRes.access_token, 'EX', tokenExp);
                    kartoffelToken = spikeRes.access_token;
                    // Add the new token to mongo
                    const newToken : IToken = {
                        id: 'Kartoffel',
                        token: kartoffelToken,
                        expireAt: new Date(Date.now() + 60),
                    };
                    await tokenModel.create(newToken);

                } else {
                    kartoffelToken = tokenObject.token;
                }
            } catch (err) {

                throw new Error(`Error in receiving token: ${err}`);
            }
        }
        // TODO: Token verification?
        return kartoffelToken;
    }
}
