import * as grpc from 'grpc';
import {
  GrpcHealthCheck,
  HealthCheckResponse,
  HealthService,
  HealthClient,
  HealthCheckRequest,
} from 'grpc-ts-health-check';
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
import { serviceName } from './config';

const StatusesEnum = HealthCheckResponse.ServingStatus;

const healthCheckStatusMap: any = {
  '': StatusesEnum.UNKNOWN,
  [serviceName]: StatusesEnum.UNKNOWN,
};

const servicesNum = Object.keys(healthCheckStatusMap).length;
let requests = new Array<HealthCheckRequest>(servicesNum);

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
    // Create the server
    const usersServer = new RPC();
    const grpcServer: grpc.Server = new grpc.Server();

    // Register the Users Service
    grpcServer.addService(UsersService, usersServer);

    // Register the health service
    const grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);
    grpcServer.addService(HealthService, grpcHealthCheck);

    // Bind and start the server
    grpcServer.bind(`0.0.0.0:${rpcPort}`, grpc.ServerCredentials.createInsecure());
    grpcServer.start();
    console.log(`Server is listening on port ${rpcPort}`);

    // Create the health client
    const healthClient = new HealthClient(`0.0.0.0:${rpcPort}`, grpc.credentials.createInsecure());
    this.addServices();

    setInterval(function () {
      requests.forEach((request) => {
        // Check health status, this will provide the current health status of the service when the request is executed.
        healthClient.check(request, (error: Error | null, response: HealthCheckResponse) => {
          if (error) {
            console.log(`${serviceName} Service: Health Check Failed`);
            console.log(error);
          }
        });
      });
    }, 1000);

    this.setHealthStatus(HealthCheckResponse.ServingStatus.SERVING);
  }

  static setHealthStatus(status: HealthCheckResponse.ServingStatus): void {
    requests.forEach((request) => {
      const serviceName: string = request.getService();
      healthCheckStatusMap[serviceName] = status;
    });
  }

  static addServices() {
    // Set services
    for (const service in healthCheckStatusMap) {
      const request = new HealthCheckRequest();
      request.setService(service);
      requests.push(request);
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
    callback: grpc.sendUnaryData<FindUserByNameResponse>
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
    const users: User[] = usersRes.map((user) => RPC.formatUser(user));

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
    callback: grpc.sendUnaryData<GetUserResponse>
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
