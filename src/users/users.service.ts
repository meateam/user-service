import * as request from 'request-promise-native';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IUser } from './users.interface';
import Spike from '../spike/spike.service';
import { RedisClient } from 'redis';
import { Func } from 'mocha';
import { KartoffelError, UserNotFoundError } from '../utils/errors';

const baseUrl = `${process.env.KARTOFFEL_URL || 'http://localhost:4000'}/api/persons`;

export default class UsersService {
    /**
     * Gets a user by its ID from the provider
     * @param id - the user ID
     */
    private SpikeService: Spike;
    private redis: RedisClient;
    private axiosInstance: AxiosInstance;

    constructor(redis: RedisClient) {
        this.redis = redis;
        this.SpikeService = new Spike(redis);
        this.axiosInstance = axios.create();
    }

    async getByID(id: string): Promise<IUser> {
        let res: AxiosResponse;
        try {
            res = await axios.get(`${baseUrl}/${id}`);
        } catch (err) {
            console.log(`Error while contacting the user service : ${err}`);
            throw new Error(`Error while contacting the user service : ${err}`);
        }
        // Checks if the request succeeded
        if (res.status !== 200) {
            console.log(`Error while contacting the user service : ${res.data}`);
            if (res.status === 404) {
                throw new UserNotFoundError(`The user with id ${id} is not found`);
            }
            throw new KartoffelError(`Error in contacting the user service : ${res.data}`);
        }
        const user:IUser = res.data;
        return user;
    }

    static async getAll(): Promise<IUser[]> {
        const res = await request(`${baseUrl}`);
        return JSON.parse(res);
    }

    /**
     * Gets a user by one of his mail addresses
     * @param domainUser - a mail address
     */
    public async getByDomainUser(domainUser: string): Promise<IUser> {
        this.authMiddleware();
        let res: AxiosResponse;
        try {
            res = await this.axiosInstance.get(`${baseUrl}/domainUser/${domainUser}`);
        } catch (err) {
            console.log(`Error while contacting the user service : ${err}`);
            throw new KartoffelError(`Error while contacting the user service : ${err}`);
        }
        // Checks if the request succeeded
        if (res.status !== 200) {
            // TODO: handle 4XX and 5XX differently after they change their behavior.
            console.log(`Error in the request to the user service. status: ${res.status} message: ${res.data}`);
            throw new KartoffelError(`Error in the request to the user service : ${res.data}`);
        }
        const user:IUser = JSON.parse(res.data);
        return user;
    }

     /**
     * Calls a function a after a authentication middleware.
     */
    public authWrapper(func: Function) {
        this.authMiddleware();
        func();
    }

    /**
     * If authentication is needed, adds an authorization header to the axios instance.
     */
    public authMiddleware() {
        if (process.env.SPIKE_REQUIRED === 'true') {
            this.addAuthInterceptor(); // async function. but cannot await since its a constructor.
        }
    }

    /**
     * Adds an Authorization header with an updated authentication token
     * from spike to the axios instance to kartoffel.
     */
    private async addAuthInterceptor() {
        const token: string = await this.SpikeService.getToken();
        // TODO: remember handle failure in rpc service.
        this.axiosInstance.interceptors.request.use(async (config) => {
            config.headers.Authorization =  token;
            return config;
        });
    }
}
