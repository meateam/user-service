import axios from 'axios';
import * as https from 'https';
import { RedisClient } from 'redis';
import { promisify } from 'util';
import SpikeToken from './spike.token.interface';

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
    public async renewToken(): Promise<SpikeToken> {
        // For when the Spike's https certificate is self signed.
        const authorizationValue = Buffer.from(`${this.spikeId}:${this.spikeSecret}`).toString('base64');

        const res = await axios({
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            method: 'post',
            url: this.spikeURL,
            data: {
                grant_type: 'client_credentials',
                audience: 'kartoffel',
            },
            headers: { Authorization: `Basic ${authorizationValue}` },
        });
        console.log(res.data);
        return res.data;
    }

    /**
     * Returns a kartoffel token saved in redis or from spike
     */
    public async getToken (): Promise<string> {
        // If we don't have the token yet
        let kartoffelToken = await this.getAsyncRedis('kartoffel:token');
        // If the token is not in redis - either because we didn't save it yet or it has been expired
        if (!kartoffelToken) {
            console.log('not in redis');
            let spikeRes: SpikeToken;
            try {
                spikeRes = await this.renewToken();
            } catch (err) {
                console.log(`Error in receiving token: ${err}`);
                throw new Error(`Error in receiving token: ${err}`);
            }
            const tokenExp = parseInt(spikeRes.expires_in, 10);
            this.redis.set('kartoffel:token', spikeRes.access_token, 'EX', tokenExp);
            kartoffelToken = spikeRes.access_token;
        }
        // TODO: Token verification?
        return kartoffelToken;
    }
}
