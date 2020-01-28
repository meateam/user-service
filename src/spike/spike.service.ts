import axios, { AxiosResponse } from 'axios';
import * as https from 'https';
import { RedisClient } from 'redis';
import { promisify } from 'util';
import SpikeToken from './spike.token.interface';
import { tokenModel, IToken, Second } from './spike.model';
import { log, Severity } from '../logger';
import { tokenID } from '../config';
import { ServerError } from '../utils/errors';

export default class Spike {
    private redis: RedisClient;
    private token: IToken | null | void;
    private spikeId: string;
    private spikeSecret: string;
    private spikeURL: string;
    private getAsyncRedis: any;

    /**
     * @param redisInstance - Redis instance to get\set token from redis service
     */
    constructor(redis: RedisClient) {
        this.redis = redis;
        this.token = undefined;
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
        if (this.token && this.checkTokenValidity()) {
            return this.token.token;
        }
        log(Severity.INFO, 'attempting to obtain token from redis', 'getToken');
        let kartoffelToken:string|null = await this.getAsyncRedis('kartoffel:token');
        let updateMongo: boolean = false;
        let tokenExp: number = 0;
        if (kartoffelToken) {
            // TODO: Token verification?
            log(Severity.INFO, 'successfully obtained token', 'getToken');
            return kartoffelToken;
        }

        // If the token is not in redis - either because we didn't save it yet or it has been expired
        log(Severity.INFO, 'failed to get token from redis. checking mongo.', 'getToken');
        let tokenObject : IToken | null | void;
        // Check if the token exists in mongo
        try {
            tokenObject = await tokenModel.findOne({ id: tokenID }).exec();
        } catch (err) {
            log(Severity.ERROR, err.toString(), 'getToken: mongo findOne');
        }
        try {
            if (!tokenObject || tokenObject.expireAt.getTime() < Date.now()) {
                log(Severity.INFO, 'failed to get token from mongo. fetching from kartoffel.', 'getToken');
                const spikeRes: SpikeToken = await this.renewToken();
                tokenExp = parseInt(spikeRes.expires_in, 10);
                this.redis.set('kartoffel:token', spikeRes.access_token, 'EX', tokenExp);
                kartoffelToken = spikeRes.access_token;
                updateMongo = true;
            } else {
                this.token = tokenObject;
                kartoffelToken = tokenObject.token;
            }
        } catch (err) {
            throw new ServerError(`Error in receiving token: ${err}`);
        }

        // Add the new token to mongo
        if (updateMongo) {
            const newToken : IToken = {
                id: tokenID,
                token: kartoffelToken,
                expireAt: new Date(Date.now() + tokenExp * Second),
            };
            try {
                this.token = newToken;
                await tokenModel.findOneAndUpdate({ id: tokenID }, newToken, { upsert: true }).exec();
            } catch (err) {
                log(Severity.ERROR, err.toString(), 'getToken: mongo findOneAndUpdate');
            }
        }

        // TODO: Token verification?
        log(Severity.INFO, 'successfully obtained token', 'getToken');
        return kartoffelToken;
    }

    private checkTokenValidity(): boolean {
        const token = this.token;
        return (token != null && token.expireAt.getTime() > Date.now());
    }
}
