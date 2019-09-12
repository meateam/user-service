import axios, { AxiosInstance } from 'axios';
import jwt from 'jsonwebtoken';
import https from 'https';
import { RedisClient } from 'redis';
import { promisify } from 'util';
import { renewKartoffelToken } from './rpc.server';
import { Error } from 'mongoose';

// const logger = require('../util/logger');

export default class Auth {
    private redis: RedisClient;
    private spikeId: string;
    private spikeSecret: string;
    private spikeURL: string;
    private kartoffelToken: string;
    private getAsyncRedis: any;
    private spikeInstance: AxiosInstance;
    // private kartoffelInstance: AxiosInstance;

    /**
     * @param redisInstance - Redis instance to get\set token from redis service
     */
    constructor(redis: RedisClient) {
        this.redis = redis;
        this.getAsyncRedis = promisify(this.redis.get).bind(this.redis);
        this.spikeId =  process.env.SPIKE_CLIENT_ID || '';
        this.spikeSecret = process.env.SPIKE_CLIENT_SECRET || '';
        this.spikeURL = process.env.SPIKE_TOKEN_URL || '';

        this.setSpikeInstance();
    }

    private setSpikeInstance() {
        const authorizationValue = Buffer.from(`${this.spikeId}:${this.spikeSecret}`).toString('base64')
        this.spikeInstance = axios.create({
            baseURL: process.env.SPIKE_TOKEN_URL,
            headers: {
                Authorization: `Basic ${authorizationValue}`,
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });
    }

    // private setKartoffelInstance() {
    //     this.kartoffelInstance = axios.create();
    //     this.kartoffelInstance.interceptors.request.use(async (config) => {
    //         config.headers.Authorization = await this.kartoffelToken;
    //         return config;
    //     })
    // }

  /**
   * Return spike's publicKey
   */
    public static async getPublicKey () {
        return (await Auth.axiosSpike.get(authParams.publicKeyPath)).data;
    }

    public async renewToken () {

        // For when the Spike's https certificate is self signed.
        const authorizationValue = Buffer.from(`${this.spikeId}:${this.spikeSecret}`).toString('base64');

        const res = await axios({
            httpsAgent: new https.Agent({ rejectUnauthorized: false });
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
     * Return getToken from spike
     */
    public async getToken () {
        if (!this.kartoffelToken) {
            this.kartoffelToken = await this.getAsyncRedis('kartoffel:token');
            if (!this.kartoffelToken) {
                try {
                    const tokenRes = await this.renewToken();
                }
                catch(err) {
                    console.log(`Error in reciving token: ${err}`);
                    throw new Error('Error in reciving token: ${err}');
                }
            }
        }
        // TODO: Token verification?
        if (!verifyToken) {
            try {
                Auth.accessToken = (await Auth.axiosSpike.post(authParams.tokenPath, {
                    grant_type: "client_credentials",
                    audience: authParams.audience,
                    scope: authParams.scope.join(' '),
                })).data.access_token;
                if (Auth.redis && Auth.redis.status === 'ready') {
                    await Auth.redis.set(Auth.keyName, Auth.accessToken);
                    logger.info('Success to set access token in redis');
                }
            } catch (error) {
                logger.error(`Error from spike: ${error.message}`);
            }
        }
        return Auth.accessToken;
    };
}

// Static params
Auth.redis;
Auth.publicKey;
Auth.accessToken;
Auth.keyName = "accessToken";

// Axios instances 
Auth.axiosSpike = axios.create({
  baseURL: `${authParams.spikeHost}:${authParams.spikePort}`,
  headers: {
    Authorization: `Basic ${Buffer.from(`${authParams.clientId}:${authParams.ClientSecret}`).toString("base64")}`
  },
  httpsAgent: new https.Agent({rejectUnauthorized: false}),
});

Auth.axiosKartoffel = axios.create();
Auth.axiosKartoffel.interceptors.request.use(async config => {
  config.headers.Authorization = await Auth.getToken();
  return config;
});
