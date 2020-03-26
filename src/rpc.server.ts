import { GrpcHealthCheck, HealthCheckResponse, HealthService } from 'grpc-ts-health-check';
import Kartoffel from './users/users.service';
import { IUser } from './users/users.interface';
import * as grpc from 'grpc';
import { UsersService, IUsersServer } from '../protos/users/generated/users_grpc_pb';
import { GetByMailRequest, GetByIDRequest, User, FindUserByNameRequest, FindUserByNameResponse, GetUserResponse } from '../protos/users/generated/users_pb';
import { wrapper } from './logger';
import { UserNotFoundError } from './utils/errors';

const StatusesEnum = HealthCheckResponse.ServingStatus;

const healthCheckStatusMap = {
    '': StatusesEnum.UNKNOWN,
    serviceName: StatusesEnum.UNKNOWN,
};
const serviceNames: string[] = ['', 'users.Users'];

/**
 * Spike is a class that implements a grpc client of the spike-service.
 */

class Server implements IUsersServer {
    private UserService: Kartoffel;
    constructor() {
        this.UserService = new Kartoffel();
    }

    /**
     * getUserByID returns a user by a given ID. This function implements the UserService's method by the same name.
      * @param call - The grpc call from the client, should contain a user ID.
      * @param callback - The grpc callback of the function that this method implements.
     */
    async getUserByID(call: grpc.ServerUnaryCall<GetByIDRequest>, callback: grpc.sendUnaryData<GetUserResponse>) {
        const GetUserById = async (call: grpc.ServerUnaryCall<GetByIDRequest>) => {
            const userID: string = call.request.getId();
            const user: IUser = await this.UserService.getByID(userID);
            const reply: GetUserResponse = new GetUserResponse();
            if (!user) {
                throw new UserNotFoundError(`The user with ID ${userID}, is not found`);
            }
            const userRes: User = this.formatUser(user);
            reply.setUser(userRes);
            return reply;
        };
        await wrapper<GetByIDRequest, GetUserResponse>(GetUserById, call, callback);
    }

    /**
     * findUserByName returns an array of users who match with a given partial-name. This function implements the UserService's method by the same name.
      * @param call - The grpc call from the client, should contain a user's partial name.
      * @param callback - The grpc callback of the function that this method implements.
     */
    async findUserByName(call: grpc.ServerUnaryCall<FindUserByNameRequest>, callback: grpc.sendUnaryData<FindUserByNameResponse>) {
        const FindUserByName = async (call: grpc.ServerUnaryCall<FindUserByNameRequest>) => {
            const userName: string = call.request.getName();
            const usersRes: IUser[] = await this.UserService.searchByName(userName);
            const users: User[] = usersRes.map(user => this.formatUser(user));
            const reply: FindUserByNameResponse = new FindUserByNameResponse();
            reply.setUsersList(users);
            return reply;
        };
        await wrapper<FindUserByNameRequest, FindUserByNameResponse>(FindUserByName, call, callback);
    }

    /**
     * getUserByMail returns a user by its domain-user (mail). This function implements the UserService's method by the same name.
      * @param call - The grpc call from the client, should contain a mail.
      * @param callback - The grpc callback of the function that this method implements.
     */
    async getUserByMail(call: grpc.ServerUnaryCall<GetByMailRequest>, callback: grpc.sendUnaryData<GetUserResponse>) {
        const GetUserByMail = async (call: grpc.ServerUnaryCall<GetByMailRequest>) => {
            const userMail: string = call.request.getMail();
            const user: IUser = await this.UserService.getByDomainUser(userMail);
            const reply: GetUserResponse = new GetUserResponse();
            if (!user) {
                throw new UserNotFoundError(`The user with Mail ${userMail}, is not found`);
            }
            const userRes: User = this.formatUser(user);
            reply.setUser(userRes);
            return reply;
        };
        await wrapper<GetByMailRequest, GetUserResponse>(GetUserByMail, call, callback);
    }

    /**
* formatUser gets a User object and returned it formatted.
* @param user- a user object from Kartoffel.
*/
    private formatUser(user: IUser): User {
        const userRes: User = new User();
        userRes.setFirstname(user.firstName);
        userRes.setLastname(user.lastName);
        userRes.setId(user.id);
        userRes.setMail(user.mail as string);
        userRes.setFullname(user.fullName as string);
        userRes.setHierarchyList(user.hierarchy);
        userRes.setHierarchyflat(Kartoffel.flattenHierarchy(user.hierarchy, user.job));
        return userRes;
    }
}

export const grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);

export function startServer(port: string) {
    const server = new grpc.Server();
    const usersServer = new Server();

    // Register UsersService
    server.addService(UsersService, usersServer);

    // Register the health service
    server.addService(HealthService, grpcHealthCheck);

    // setHealthStatus(spikeServer, HealthCheckResponse.ServingStatus.SERVING);
    server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(`Server is listening on port ${port}`);
    setHealthStatus(usersServer, HealthCheckResponse.ServingStatus.SERVING);
}

function setHealthStatus(server: Server, status: number): void {
    for (let i = 0; i < serviceNames.length; i++) {
        grpcHealthCheck.setStatus(serviceNames[i], status);
    }
}
