import Kartoffel from './users/users.service';
import { IUser } from './users/users.interface';
import { RedisClient } from 'redis';
import { wrapper } from './logger';

const PROTO_PATH = `${__dirname}/../proto/users.proto`;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
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
    private redis: RedisClient;

    public constructor(port: string, redisClient: RedisClient) {
        this.redis = redisClient;
        this.UsersService = new Kartoffel(this.redis);
        this.server = new grpc.Server();
        this.server.addService(users_proto.Users.service, {
            GetUserByID: wrapper(this.getUserByID),
            GetUserByMail: wrapper(this.getUserByMail),
        });
        this.server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    }

    private getUserByID = async (call: any, callback: any) => {
        const user:IUser = await this.UsersService.getByID(call.request.id);
        if (!user) {
            throw new Error(`The user with Mail ${call.request.mail}, is not found`);
        }
        return { user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            mail: user.primaryDomainUser.uniqueID,
        }};
    }

    private getUserByMail = async (call: any, callback: any) => {
        const user:IUser = await this.UsersService.getByDomainUser(call.request.mail);
        if (!user) {
            throw new Error(`The user with Mail ${call.request.mail}, is not found`);
        }
        return { user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            mail: user.primaryDomainUser.uniqueID,
        }};
    }
}
