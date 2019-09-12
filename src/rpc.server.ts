import { UsersService } from './users/users.service';
import { IUser } from './users/users.interface';
import RedisClient, * as redis from 'redis';
import { promisify } from 'util';
import Axios, * as axios from 'axios';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as https from 'https';

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

    public constructor(port: string) {
        // this.redis = redisClient;
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
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            mail: user.primaryDomainUser.uniqueID,
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
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            mail: user.primaryDomainUser.uniqueID,
        }});
    }

}

const redisClient = redis.createClient();
redisClient.on('error', function (err) {
    console.log(`Error ${err}`);
});
const getAsyncRedis = promisify(redisClient.get).bind(redisClient);

async function spikeMiddleware() {
    let kartoffelToken:string = await getAsyncRedis('kartoffel:token');
    if (!kartoffelToken) {
        kartoffelToken = await renewKartoffelToken();
        redisClient.set('kartoffel:token', kartoffelToken);
    }
    return kartoffelToken;
}

export async function renewKartoffelToken(): Promise<string> {
    const spikeId =  process.env.SPIKE_CLIENT_ID;
    const spikeSecret = process.env.SPIKE_CLIENT_SECRET;

    // For when the Spike's https certificate is self signed.
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const authorizationValue = Buffer.from(`${spikeId}:${spikeSecret}`).toString('base64');
    Axios({
        httpsAgent,
        method: 'post',
        url: process.env.SPIKE_TOKEN_URL,
        data: {
            grant_type: 'client_credentials',
            audience: 'kartoffel',
        },
        headers: { Authorization: `Basic ${authorizationValue}` },
    }).then((res) => {
        console.log(res);
        return res.data;
    }).catch((err) => {
        console.log(err);
    });
    return '';
}
