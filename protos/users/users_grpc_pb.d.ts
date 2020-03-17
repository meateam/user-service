// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as users_pb from "./users_pb";

interface IUsersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUserByMail: IUsersService_IGetUserByMail;
    getUserByID: IUsersService_IGetUserByID;
    findUserByName: IUsersService_IFindUserByName;
}

interface IUsersService_IGetUserByMail extends grpc.MethodDefinition<users_pb.GetByMailRequest, users_pb.GetUserResponse> {
    path: string; // "/users.Users/GetUserByMail"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_pb.GetByMailRequest>;
    requestDeserialize: grpc.deserialize<users_pb.GetByMailRequest>;
    responseSerialize: grpc.serialize<users_pb.GetUserResponse>;
    responseDeserialize: grpc.deserialize<users_pb.GetUserResponse>;
}
interface IUsersService_IGetUserByID extends grpc.MethodDefinition<users_pb.GetByIDRequest, users_pb.GetUserResponse> {
    path: string; // "/users.Users/GetUserByID"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_pb.GetByIDRequest>;
    requestDeserialize: grpc.deserialize<users_pb.GetByIDRequest>;
    responseSerialize: grpc.serialize<users_pb.GetUserResponse>;
    responseDeserialize: grpc.deserialize<users_pb.GetUserResponse>;
}
interface IUsersService_IFindUserByName extends grpc.MethodDefinition<users_pb.FindUserByNameRequest, users_pb.FindUserByNameResponse> {
    path: string; // "/users.Users/FindUserByName"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_pb.FindUserByNameRequest>;
    requestDeserialize: grpc.deserialize<users_pb.FindUserByNameRequest>;
    responseSerialize: grpc.serialize<users_pb.FindUserByNameResponse>;
    responseDeserialize: grpc.deserialize<users_pb.FindUserByNameResponse>;
}

export const UsersService: IUsersService;

export interface IUsersServer {
    getUserByMail: grpc.handleUnaryCall<users_pb.GetByMailRequest, users_pb.GetUserResponse>;
    getUserByID: grpc.handleUnaryCall<users_pb.GetByIDRequest, users_pb.GetUserResponse>;
    findUserByName: grpc.handleUnaryCall<users_pb.FindUserByNameRequest, users_pb.FindUserByNameResponse>;
}

export interface IUsersClient {
    getUserByMail(request: users_pb.GetByMailRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByMail(request: users_pb.GetByMailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByMail(request: users_pb.GetByMailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: users_pb.GetByIDRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: users_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: users_pb.GetByIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: users_pb.FindUserByNameRequest, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: users_pb.FindUserByNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: users_pb.FindUserByNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
}

export class UsersClient extends grpc.Client implements IUsersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUserByMail(request: users_pb.GetByMailRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByMail(request: users_pb.GetByMailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByMail(request: users_pb.GetByMailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: users_pb.GetByIDRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: users_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: users_pb.GetByIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: users_pb.FindUserByNameRequest, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: users_pb.FindUserByNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: users_pb.FindUserByNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
}
