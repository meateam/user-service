import { UsersService } from '../users/users.service';
import { IUser } from '../users/users.interface';

const PROTO_PATH = `${__dirname}/../../protos/users.proto`;
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

    public constructor(port: string) {
        this.server = new grpc.Server();
        this.server.addService(users_proto.Users.service, {
            GetUserByID: this.getUserByID,
            GetUserByMail: this.getUserByMail,
        });
        this.server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
    }

    private async getUserByID(call: any, callback: any) {
        const user:IUser | null = await UsersService.getByID(call.request.id);
        if (!user) {
            return callback({
                code: '404',
                message: `The user with ID ${call.request.id}, is not found`,
                status: grpc.status.NOT_FOUND,
            });
        }
        callback(null, { user: {
            firstName: user.firstName,
            lastName: user.lastName,
        }});
    }

    private async getUserByMail(call: any, callback: any) {
        const user:IUser | null = await UsersService.getByDomainUser(call.request.mail);
        if (!user) {
            return callback({
                code: '404',
                message: `The user with Mail ${call.request.mail}, is not found`,
                status: grpc.status.NOT_FOUND,
            });
        }
        callback(null, { user: {
            firstName: user.firstName,
            lastName: user.lastName,
        }});
    }

}
