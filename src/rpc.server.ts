import { GrpcHealthCheck, HealthCheckResponse, HealthService } from 'grpc-ts-health-check';
import * as grpc from 'grpc';
import { UsersService, IUsersServer } from '../proto/users/generated/users/users_grpc_pb';
import {
    GetByMailOrTRequest,
    GetByIDRequest,
    User,
    FindUserByNameRequest,
    FindUserByNameResponse,
    GetUserResponse,
} from '../proto/users/generated/users/users_pb';
import { wrapper } from './logger';
import { ClientError, UserNotFoundError } from './utils/errors';
import { EXTERNAL_DESTS, IUser } from './users/users.interface';
import { UserService } from './users/users.service';

const StatusesEnum = HealthCheckResponse.ServingStatus;

const healthCheckStatusMap = {
    '': StatusesEnum.UNKNOWN,
    serviceName: StatusesEnum.UNKNOWN,
};
const serviceNames: string[] = ['', 'users.Users'];
const grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);

/**
 * Spike is a class that implements a grpc client of the spike-service.
 */
export class RPC implements IUsersServer {
    static userService: UserService;

    constructor() {
        RPC.userService = new UserService();
    }

    /**
     * start function starts the grpc server
     * @param rpcPort
     */
    static start(rpcPort: string) {
        const usersServer = new RPC();
        const grpcServer: grpc.Server = new grpc.Server();
        const grpcHealthCheck: GrpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);

        // Register UsersService
        grpcServer.addService(UsersService, usersServer);

        // Register the health service
        grpcServer.addService(HealthService, grpcHealthCheck);

        grpcServer.bind(`0.0.0.0:${rpcPort}`, grpc.ServerCredentials.createInsecure());
        grpcServer.start();
        console.log(`Server is listening on port ${rpcPort}`);
        this.setHealthStatus(usersServer, HealthCheckResponse.ServingStatus.SERVING);
    }

    static setHealthStatus(server: RPC, status: number): void {
        for (let i = 0; i < serviceNames.length; i++) {
            grpcHealthCheck.setStatus(serviceNames[i], status);
        }
    }

    /**
     * getUserByID returns a user by a given ID. This function implements the UserService's method by the same name.
     * @param call - The grpc call from the client, should contain a user ID.
     * @param callback - The grpc callback of the function that this method implements.
     */
    async getUserByID(call: grpc.ServerUnaryCall<GetByIDRequest>, callback: grpc.sendUnaryData<GetUserResponse>) {
        await wrapper<GetByIDRequest, GetUserResponse>(RPC.getUserByIDHandler, call, callback);
    }

    static async getUserByIDHandler(call: grpc.ServerUnaryCall<GetByIDRequest>) {
        const userID: string = call.request.getId();
        const destination: string = call.request.getDestination();

        if (destination && !(destination in EXTERNAL_DESTS)) {
            throw new ClientError(`The destination ${destination}, is not found`);
        }

        const user: IUser = await RPC.userService.getByID(userID, destination);
        if (!user) {
            throw new UserNotFoundError(`The user with ID ${userID}, is not found`);
        }
        const userRes: User = RPC.formatUser(user);

        const reply: GetUserResponse = new GetUserResponse();
        reply.setUser(userRes);
        return reply;
    }

    /**
     * findUserByName returns an array of users who match with a given partial-name. This function implements the UserService's method by the same name.
     * @param call - The grpc call from the client, should contain a user's partial name.
     * @param callback - The grpc callback of the function that this method implements.
     */
    async findUserByName(
        call: grpc.ServerUnaryCall<FindUserByNameRequest>,
        callback: grpc.sendUnaryData<FindUserByNameResponse>,
    ) {
        await wrapper<FindUserByNameRequest, FindUserByNameResponse>(RPC.findUserByNameHandler, call, callback);
    }

    static async findUserByNameHandler(call: grpc.ServerUnaryCall<FindUserByNameRequest>) {
        const userName: string = call.request.getName();
        const destination: string = call.request.getDestination();

        if (destination && !(destination in EXTERNAL_DESTS)) {
            throw new ClientError(`The destination ${destination}, is not found`);
        }

        const usersRes: IUser[] = await RPC.userService.searchByName(userName, destination);
        const users: User[] = usersRes.map(user => RPC.formatUser(user));

        const reply: FindUserByNameResponse = new FindUserByNameResponse();
        reply.setUsersList(users);
        return reply;
    }

    /**
     * getUserByMailOrT returns a user by its domain-user (mail or t). This function implements the UserService's method by the same name.
     * @param call - The grpc call from the client, should contain a mail.
     * @param callback - The grpc callback of the function that this method implements.
     */
    async getUserByMailOrT(
        call: grpc.ServerUnaryCall<GetByMailOrTRequest>,
        callback: grpc.sendUnaryData<GetUserResponse>,
    ) {
        await wrapper<GetByMailOrTRequest, GetUserResponse>(RPC.getUserByMailOrTHandler, call, callback);
    }

    static async getUserByMailOrTHandler(call: grpc.ServerUnaryCall<GetByMailOrTRequest>) {
        const userMailOrT: string = call.request.getMailort();
        const destination: string = call.request.getDestination();
        if (destination && !(destination in EXTERNAL_DESTS)) {
            throw new ClientError(`The destination ${destination}, is not found`);
        }

        const user: IUser = await RPC.userService.getByDomainUser(userMailOrT, destination);
        const reply: GetUserResponse = new GetUserResponse();
        if (!user) {
            throw new UserNotFoundError(`The user with Mail ${userMailOrT}, is not found`);
        }
        const userRes: User = RPC.formatUser(user);
        reply.setUser(userRes);
        return reply;
    }

    /**
     * formatUser gets a User object and returned it formatted.
     * @param user- a user object from user service.
     */
    static formatUser(user: IUser): User {
        const userRes: User = new User();

        userRes.setFirstname(user.firstName);
        userRes.setLastname(user.lastName || ' ');
        userRes.setId(user.id);
        userRes.setMail(user.mail as string);
        userRes.setFullname(user.fullName as string);
        userRes.setHierarchyList(user.hierarchy as string[]);
        userRes.setHierarchyflat(user.hierarchyFlat);

        return userRes;
    }
}
