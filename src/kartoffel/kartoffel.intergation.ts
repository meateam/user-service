import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Spike from '../spike/spike.service';
import { UserNotFoundError, ApplicationError, SpikeError, UnauthorizedError, KartoffelError } from '../utils/errors';
import { ctsDatasource, kartoffelCTSQueryGet, kartoffelCTSQuerySearch, kartoffelQuery, kartoffelURL } from '../config';
import { IDomainUser, IKartoffelUser } from './kartoffel.interface';
import { EXTERNAL_DESTS, IUser } from '../users/users.interface';

export class Kartoffel {
    private instance: AxiosInstance;
    private SpikeService: Spike;

    constructor() {
        this.SpikeService = new Spike();
        this.instance = axios.create({ baseURL: kartoffelURL });

        // If authentication is needed, adds an authorization header to the axios instance.
        if (process.env.SPIKE_REQUIRED === 'true') {
            this.addAuthInterceptor();
        }
    }

    /**
     * Gets a user by its ID from the provider
     * @param id - the user ID (return the id that specified in the request)
     * @param dest? - optional param that identify the external destination, if not mentioned look in non-external network
     */
    async getByID(id: string, dest?: string): Promise<IUser> {
        let res: AxiosResponse;
        try {
            const query: string = dest && dest === (EXTERNAL_DESTS.CTS as any as string) ? kartoffelCTSQueryGet : '';
            res = await this.instance.get(`${query}/${id}`);
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
        const user: IKartoffelUser = res.data;

        if (dest && dest === (EXTERNAL_DESTS.CTS as any as string)) {
            // Check if the id is match to cts datasource
            const userMatch: IDomainUser[] = user.domainUsers.filter((domainUser) => {
                return ctsDatasource === domainUser.dataSource && domainUser.uniqueID.toLowerCase() === id.toLowerCase();
            });
            if (userMatch.length < 1) throw new UserNotFoundError(`The user with id ${id} is not found`);

            // Replace the return id to cts id
            user.id = userMatch[0].uniqueID ? userMatch[0].uniqueID : user.id;
        }

        const generalUser = this.setUser(user);
        return generalUser;
    }

    /**
     * Gets a user by one of his mail addresses
     * @param domainUser - a mail address
     * @param dest? - optional param that identify the external destination, if not mentioned look in non-external network
     */
    public async getByDomainUser(domainUser: string, dest?: string): Promise<IUser> {
        let res: AxiosResponse;
        try {
            res = await this.instance.get(`/domainUser/${domainUser}`);
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
        const user: IKartoffelUser = res.data;

        if (dest && dest === (EXTERNAL_DESTS.CTS as any as string)) {
            // Check if the person has user in cts datasource
            const userMatch: IDomainUser[] = user.domainUsers.filter(
                (domainUser) => ctsDatasource === domainUser.dataSource
            );
            if (userMatch.length < 1) throw new UserNotFoundError(`The user with id ${user.id} has no datasource`);

            // Replace the return id to cts id
            user.id = userMatch[0].uniqueID ? userMatch[0].uniqueID : user.id;
        }

        const generalUser = this.setUser(user);
        return generalUser;
    }

    /**
     * Search user suggestions by a partial name. returns a list of users ordered by resemblance score
     * @param partialName - the partial name to search by.
     * @param dest? - optional param that identify the external destination, if not mentioned look in non-external network
     */
    public async searchByName(partialName: string, dest?: string): Promise<IUser[]> {
        let res: AxiosResponse;
        try {
            const query: string =
                dest && dest === (EXTERNAL_DESTS.CTS as any as string) ? kartoffelCTSQuerySearch : kartoffelQuery;
            res = await this.instance.get(query, { params: { fullname: partialName } });
        } catch (err) {
            throw new ApplicationError(`Unknown Error: ${err} `);
        }
        const users: IKartoffelUser[] = res.data;
        const generalUsers: IUser[] = users.map((user: IKartoffelUser) => {
            if (dest && dest === (EXTERNAL_DESTS.CTS as any as string)) {
                // Get the id that match to cts datasource and replace the return id to cts id
                const userMatch: IDomainUser[] = user.domainUsers.filter((domainUser) => {
                    return ctsDatasource === domainUser.dataSource;
                });
                user.id = userMatch[0].uniqueID ? userMatch[0].uniqueID : user.id;
            }

            return this.setUser(user);
        });
        return generalUsers;
    }

    /**
     * This function gets an hierarchy in an array form and reduce it to a long string format
     * @param hierarchy - The hierarchy array.
     * @param job - The job of the user.
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
        this.instance.interceptors.request.use(async (config) => {
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

    /**
     * Parse kartoffel user to user-service general user
     * @param userData
     */
    private setUser(userData: IKartoffelUser): IUser {
        const user: IUser = {
            id: userData.id,
            mail: userData.mail as string,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: `${userData.firstName} ${userData.lastName}`,
            hierarchyFlat: Kartoffel.flattenHierarchy(userData.hierarchy, userData.job),
            hierarchy: userData.hierarchy,
        };

        return user;
    }
}
