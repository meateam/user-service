import { GrpcHealthCheck, HealthCheckResponse, HealthService } from 'grpc-ts-health-check';
import Kartoffel from './users/users.service';
import { IUser } from './users/users.interface';
import * as grpc from 'grpc';
import { UsersService, IUsersServer } from '../protos/users/generated/users_grpc_pb';
import { GetByMailRequest, GetByIDRequest, User, FindUserByNameRequest, FindUserByNameResponse, GetUserResponse } from '../protos/users/generated/users_pb';
import { wrapper } from './logger';

const StatusesEnum = HealthCheckResponse.ServingStatus;

const healthCheckStatusMap = {
    '': StatusesEnum.UNKNOWN,
    serviceName: StatusesEnum.UNKNOWN,
};
const serviceNames: string[] = ['', 'users.Users'];

class Server implements IUsersServer {
    private UserService: Kartoffel;
    constructor() {
        this.UserService = new Kartoffel();
    }

    async getUserByID(call: grpc.ServerUnaryCall<GetByIDRequest>, callback: grpc.sendUnaryData<GetUserResponse>) {
        try {
            const userId: string = call.request.getId();
            console.log(userId);
            const user: IUser = await this.UserService.getByID(userId);
            const replay: GetUserResponse = new GetUserResponse();
            if (!user) {
                throw new Error(`The user with Id ${userId}, is not found`);
            }
            const userRes = this.getUserReplay(user);
            replay.setUser(userRes);
            callback(null, replay);

        } catch (err) {
            callback(err, null);
        }
    }

    async findUserByName(call: grpc.ServerUnaryCall<FindUserByNameRequest>, callback: grpc.sendUnaryData<FindUserByNameResponse>) {
        try {
            const userName: string = call.request.getName();
            const usersRes: IUser[] = await this.UserService.searchByName(userName);
            const users: User[] = usersRes.map(user => this.getUserReplay(user));
            const replay: FindUserByNameResponse = new FindUserByNameResponse();
            callback(null, replay);
        } catch (err) {
            callback(err, null);
        }
    }

    async getUserByMail(call: grpc.ServerUnaryCall<GetByMailRequest>, callback: grpc.sendUnaryData<GetUserResponse>) {
        try {
            const userMail: string = call.request.getMail();
            const user: IUser = await this.UserService.getByDomainUser(userMail);
            const replay: GetUserResponse = new GetUserResponse();
            if (!user) {
                throw new Error(`The user with Mail ${userMail}, is not found`);
            }
            const userRes = this.getUserReplay(user);
            replay.setUser(userRes);
            callback(null, replay);
        } catch (err) {
            callback(err, null);
        }
    }

    private getUserReplay(user: IUser): User {
        const userRes: User = new User();
        userRes.setFirstname(user.firstName);
        userRes.setLastname(user.lastName);
        userRes.setId(user.id);
        userRes.setMail(user.mail as string);
        userRes.setFullname(user.fullName as string);
        userRes.setHierarchyList(user.hierarchy);
        userRes.setHierarchyflat(user.hierarchyFlat as string);
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
}

function setHealthStatus(server: Server, status: number): void {
    for (let i = 0; i < serviceNames.length; i++) {
        grpcHealthCheck.setStatus(serviceNames[i], status);
    }
}
