import { GrpcHealthCheck, HealthCheckResponse, HealthService } from 'grpc-ts-health-check';
import { Kartoffel } from './users/users.service';
import { IUser } from './users/users.interface';
import { Phonebook } from "./phonebook/phonebook.service";
import { IApproverInfo } from './phonebook/approvers.interface';
import * as grpc from 'grpc';
import { UsersService, IUsersServer } from '../proto/users/generated/users/users_grpc_pb';
import { GetByMailRequest, GetByIDRequest, User, ApproverInfo, FindUserByNameRequest, FindUserByNameResponse, GetUserResponse, GetApproverInfoResponse, GetApproverInfoRequest } from '../proto/users/generated/users/users_pb';
import { wrapper } from './logger';
import { UserNotFoundError } from './utils/errors';

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
    static karttofelClient: Kartoffel;
    static phonebookClient: Phonebook;

    constructor() {
        RPC.karttofelClient = new Kartoffel();
        RPC.phonebookClient = new Phonebook();
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

    async getApproverInfo(call: grpc.ServerUnaryCall<GetApproverInfoRequest>, callback: grpc.sendUnaryData<GetApproverInfoResponse>) {
        await wrapper<GetApproverInfoRequest, GetApproverInfoResponse>(RPC.getApproverInfoHandler, call, callback);
    }

    static async getApproverInfoHandler(call: grpc.ServerUnaryCall<GetApproverInfoRequest>) {
        const userID: string = call.request.getId();
        const info: IApproverInfo = await RPC.phonebookClient.getApproverInfo(userID);
        const reply: GetApproverInfoResponse = new GetApproverInfoResponse();
        if (!info) {
            throw new UserNotFoundError(`The user with ID ${info}, is not found`);
        }
        const formattedInfo: ApproverInfo = RPC.formatApproverInfo(info);
        reply.setInfo(formattedInfo);
        return reply;
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
        const user: IUser = await RPC.karttofelClient.getByID(userID);
        const reply: GetUserResponse = new GetUserResponse();
        if (!user) {
            throw new UserNotFoundError(`The user with ID ${userID}, is not found`);
        }
        const userRes: User = RPC.formatUser(user);
        reply.setUser(userRes);
        return reply;
    }

    /**
     * findUserByName returns an array of users who match with a given partial-name. This function implements the UserService's method by the same name.
      * @param call - The grpc call from the client, should contain a user's partial name.
      * @param callback - The grpc callback of the function that this method implements.
     */
    async findUserByName(call: grpc.ServerUnaryCall<FindUserByNameRequest>, callback: grpc.sendUnaryData<FindUserByNameResponse>) {
        await wrapper<FindUserByNameRequest, FindUserByNameResponse>(RPC.findUserByNameHandler, call, callback);
    }

    static async findUserByNameHandler(call: grpc.ServerUnaryCall<FindUserByNameRequest>) {
        const userName: string = call.request.getName();
        const usersRes: IUser[] = await RPC.karttofelClient.searchByName(userName);
        const users: User[] = usersRes.map(user => RPC.formatUser(user));
        const reply: FindUserByNameResponse = new FindUserByNameResponse();
        reply.setUsersList(users);
        return reply;
    }

    /**
     * getUserByMail returns a user by its domain-user (mail). This function implements the UserService's method by the same name.
      * @param call - The grpc call from the client, should contain a mail.
      * @param callback - The grpc callback of the function that this method implements.
     */
    async getUserByMail(call: grpc.ServerUnaryCall<GetByMailRequest>, callback: grpc.sendUnaryData<GetUserResponse>) {
        await wrapper<GetByMailRequest, GetUserResponse>(RPC.getUserByMailHandler, call, callback);
    }

    static async getUserByMailHandler(call: grpc.ServerUnaryCall<GetByMailRequest>) {
        const userMail: string = call.request.getMail();
        const user: IUser = await RPC.karttofelClient.getByDomainUser(userMail);
        const reply: GetUserResponse = new GetUserResponse();
        if (!user) {
            throw new UserNotFoundError(`The user with Mail ${userMail}, is not found`);
        }
        const userRes: User = RPC.formatUser(user);
        reply.setUser(userRes);
        return reply;
    }

    /**
* formatUser gets a User object and returned it formatted.
* @param user- a user object from Kartoffel.
*/
    static formatUser(user: IUser): User {
        const userRes: User = new User();
        userRes.setFirstname(user.firstName);
        userRes.setLastname(user.lastName || ' ');
        userRes.setId(user.id);
        userRes.setMail(user.mail as string);
        userRes.setFullname(user.fullName as string);
        userRes.setHierarchyList(user.hierarchy);
        userRes.setHierarchyflat(Kartoffel.flattenHierarchy(user.hierarchy, user.job));
        return userRes;
    }

    /**
     * formatApproverInfo gets the Info object and returned it formatted.
     * @param info is the user approver info from the phonebook
     */
    static formatApproverInfo(info: IApproverInfo): ApproverInfo {
        const approverInfoRes: ApproverInfo = new ApproverInfo();

        approverInfoRes.setCanapprove(info.isAdmin || info.canApprove);
        approverInfoRes.setUnit(info.unit.name);
        approverInfoRes.setApproversList(info.unit.approvers);

        return approverInfoRes;
    }
}
