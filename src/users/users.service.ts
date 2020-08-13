import * as request from 'request-promise-native';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IUser } from './users.interface';
import Spike from '../spike/spike.service';
import { KartoffelError, UserNotFoundError, ApplicationError, SpikeError, UnauthorizedError } from '../utils/errors';
import { kartoffelURL, kartoffelQuery } from '../config';

export class Kartoffel {
    private axiosInstance: AxiosInstance;
    private SpikeService: Spike;

    constructor() {
        this.SpikeService = new Spike();
        this.axiosInstance = axios.create();
        // If authentication is needed, adds an authorization header to the axios instance.
        if (process.env.SPIKE_REQUIRED === 'true') {
            this.addAuthInterceptor();
        }
    }

    /**
     * Gets a user by its ID from the provider
     * @param id - the user ID
     */
    async getByID(id: string): Promise<IUser> {
        let res: AxiosResponse;
        try {
            res = await this.axiosInstance.get(`${kartoffelURL}/${id}`);
        } catch (err) {
            if (err.response && err.response.status) {
                const statusCode: number = err.response.status;
                if (statusCode === 404) {
                    throw new UserNotFoundError(`The user with id ${id} is not found`);
                }
                // Unauthorized
                if (statusCode === 401) {
                    throw new UnauthorizedError(`Request to Kartoffel wasn't authorized: ${JSON.stringify(err)} `);
                }
                throw new KartoffelError(`Error in contacting the user service : ${JSON.stringify(err)}`);
            } else {
                throw new ApplicationError(`Unknown Error while contacting the user service : ${JSON.stringify(err)}`);
            }
        }
        // Status Code = 2XX / 3XX
        const user: IUser = res.data;
        return user;
    }

    private static async getAll(): Promise<IUser[]> {
        const res = await request(`${kartoffelURL}${kartoffelQuery}`);
        return JSON.parse(res);
    }

    /**
     * Gets a user by one of his mail addresses
     * @param domainUser - a mail address
     */
    public async getByDomainUser(domainUser: string): Promise<IUser> {
        let res: AxiosResponse;
        try {
            res = await this.axiosInstance.get(`${kartoffelURL}/domainUser/${domainUser}`);
        } catch (err) {
            if (err.response && err.response.status) {
                const statusCode: number = err.response.status;
                if (statusCode === 404) {
                    throw new UserNotFoundError(`The user with mail ${domainUser} is not found`);
                }
                // Unauthorized
                if (statusCode === 401) {
                    throw new ApplicationError(`Request to Kartoffel wasn't authorized: ${JSON.stringify(err)} `);
                }
                throw new KartoffelError(`Error in contacting the user service : ${JSON.stringify(err)}`);
            } else {
                throw new ApplicationError(`Unknown Error while contacting the user service : ${JSON.stringify(err)}`);
            }
        }
        // Status Code = 2XX / 3XX
        const user: IUser = res.data;
        return user;
    }

    /**
     * Search user suggestions by a partial name. returns a list of users ordered by resemblance score
     * @param partialName - the partial name to search by.
     */
    public async searchByName(partialName: string): Promise<IUser[]> {
        let res: AxiosResponse;
        try {
            res = await this.axiosInstance.get(`${kartoffelURL}${kartoffelQuery}`, { params: { fullname: partialName } });
        } catch (err) {
            throw new ApplicationError(`Unknown Error: ${err} `);
        }
        const users: IUser[] = res.data;
        return users;
    }

    /**
     * This function gets an hierarchy in an array form and reduce it to a long string format
     * @param hierarchy - The hierarchy array.
     */
    public static flattenHierarchy(hierarchy: string[], job: string): string {
        let flat = hierarchy.join('/');
        if (job) {
            flat += `/${job}`;
        }
        return flat;
    }

    /**
     * Adds an Authorization header with an updated authentication token
     * from spike to the axios instance to kartoffel.
     */
    private addAuthInterceptor() {
        this.axiosInstance.interceptors.request.use(async (config) => {
            try {
                const token: string = await this.SpikeService.getToken();
                config.headers = {
                    Authorization: token,
                };
                return config;
            } catch (err) {
                throw new SpikeError(`Error contacting spike: ${err}`);
            }
        });
    }
}
