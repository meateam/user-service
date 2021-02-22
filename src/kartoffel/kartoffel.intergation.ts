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
     * @param id - the user ID
     */
    async getByID(id: string, dest?: string): Promise<IUser> {
        let res: AxiosResponse;
        try {
            let query: string = (dest && dest == EXTERNAL_DESTS.c)? kartoffelCTSQueryGet: '';  
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
        const generalUser = this.setUser(user);
        return generalUser;
    }

     /**
     * Gets a user by one of his mail addresses
     * @param domainUser - a mail address
     */
    public async getByDomainUser(domainUser: string): Promise<IUser> {
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
        const generalUser = this.setUser(user);
        return generalUser;
    }


     /**
     * Search user suggestions by a partial name. returns a list of users ordered by resemblance score
     * @param partialName - the partial name to search by.
     */
    public async searchByName(partialName: string, dest?: string): Promise<IUser[]> {
        let res: AxiosResponse;
        try {
            let query: string = (dest && dest == EXTERNAL_DESTS.c)? kartoffelCTSQuerySearch: kartoffelQuery;
            res = await this.instance.get(query, { params: { fullname: partialName } });
        } catch (err) {
            throw new ApplicationError(`Unknown Error: ${err} `);
        }
        let dest_domain: string = (dest && dest == EXTERNAL_DESTS.c)? ctsDatasource: '';
        const users: IKartoffelUser[] = res.data;
        const generalUsers = users.map(user=>this.setUser(user, dest_domain));
        return generalUsers;
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

    private setUser(userData: IKartoffelUser, dest?: string): IUser {
        let user: IUser = {
            id: userData.id,
            mail: userData.mail as string,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: `${userData.firstName} ${userData.lastName}`,
            hierarchyFlat: Kartoffel.flattenHierarchy(userData.hierarchy, userData.job),
            hierarchy: userData.hierarchy,
        };

        // if(dest) {
        //     const domainUser: IDomainUser[] = userData.domainUsers.filter(domainUser => {return domainUser.dataSource === dest});
        //     user.domainUser = domainUser[0];
        // }

        return user;
    }
}
