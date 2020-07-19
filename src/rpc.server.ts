import { GrpcHealthCheck, HealthCheckResponse, HealthService } from 'grpc-ts-health-check';

import Kartoffel from './users/users.service';
import { IUser } from './users/users.interface';
import { PhonebookService } from "./phonebook/phonebook.service";
import { IApproverInfo, IFormatedApproverInfo } from './phonebook/approvers.interface';
import { wrapper } from './logger';

export const serviceNames: string[] = ['', 'users.Users'];
export const healthCheckStatusMap = {
    '': HealthCheckResponse.ServingStatus.UNKNOWN,
    serviceName: HealthCheckResponse.ServingStatus.UNKNOWN,
};

const PROTO_PATH = `${__dirname}/../proto/users.proto`;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
const users_proto = protoDescriptor.users;

export class RPC {
    public server: any;
    private UsersService: Kartoffel;
    private PhonebookService: PhonebookService;
    public grpcHealthCheck: GrpcHealthCheck;

    public constructor(port: string) {
        this.UsersService = new Kartoffel();
        this.PhonebookService = new PhonebookService();
        this.server = new grpc.Server();
        // Register the health service
        this.grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);
        this.server.addService(HealthService, this.grpcHealthCheck);

        this.server.addService(users_proto.Users.service, {
            GetUserByID: wrapper(this.getUserByID, 'GetUserByID'),
            GetUserByMail: wrapper(this.getUserByMail, 'GetUserByMail'),
            FindUserByName: wrapper(this.findUsersByPartialName, 'FindUserByName'),
        });
        this.server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    }

    private getUserByID = async (call: any, callback: any) => {
        const user: IUser = await this.UsersService.getByID(call.request.id);
        if (!user) {
            throw new Error(`The user with Mail ${call.request.mail}, is not found`);
        }
        return { user: this.filterUserFields(user) };
    }

    private getUserByMail = async (call: any, callback: any) => {
        const user: IUser = await this.UsersService.getByDomainUser(call.request.mail);
        if (!user) {
            throw new Error(`The user with Mail ${call.request.mail}, is not found`);
        }
        return { user: this.filterUserFields(user) };
    }

    private getApproverInfo = async (call: any, callback: any) => {
        const info: IApproverInfo = await this.PhonebookService.getApproverInfo(call.request.id);
        if (!info) {
            throw new Error(`The user is not found`);
        }
        return info;
    }

    private findUsersByPartialName = async (call: any, callback: any) => {
        const usersRes: IUser[] = await this.UsersService.searchByName(call.request.name);
        const users = usersRes.map(user => this.filterUserFields(user));
        return { users };
    }

    private filterUserFields(user: IUser): Partial<IUser> {
        const filtereduUser = {
            id: user.id,
            mail: user.mail,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            hierarchy: user.hierarchy,
            hierarchyFlat: Kartoffel.flattenHierarchy(user.hierarchy, user.job),
        };

        return filtereduUser;
    }

    private filterApproverInfoFields(info: IApproverInfo): IFormatedApproverInfo {
        const unit = {
            name: info.unit.name,
            approvers: info.unit.approvers
        }

        const filterdInfo: IFormatedApproverInfo = {
            canApprove: info.isAdmin || info.canApprove,
            unit,
        }
        return filterdInfo;
    }
}
