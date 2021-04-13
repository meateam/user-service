// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as users_pb from "./users_pb";

interface IUsersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUserByMailOrT: IUsersService_IGetUserByMailOrT;
    getUserByID: IUsersService_IGetUserByID;
    findUserByName: IUsersService_IFindUserByName;
}

interface IUsersService_IGetUserByMailOrT extends grpc.MethodDefinition<users_pb.GetByMailOrTRequest, users_pb.GetUserResponse> {
    path: "/users.Users/GetUserByMailOrT";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.GetByMailOrTRequest>;
    requestDeserialize: grpc.deserialize<users_pb.GetByMailOrTRequest>;
    responseSerialize: grpc.serialize<users_pb.GetUserResponse>;
    responseDeserialize: grpc.deserialize<users_pb.GetUserResponse>;
}
interface IUsersService_IGetUserByID extends grpc.MethodDefinition<users_pb.GetByIDRequest, users_pb.GetUserResponse> {
    path: "/users.Users/GetUserByID";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.GetByIDRequest>;
    requestDeserialize: grpc.deserialize<users_pb.GetByIDRequest>;
    responseSerialize: grpc.serialize<users_pb.GetUserResponse>;
    responseDeserialize: grpc.deserialize<users_pb.GetUserResponse>;
}
interface IUsersService_IFindUserByName extends grpc.MethodDefinition<users_pb.FindUserByNameRequest, users_pb.FindUserByNameResponse> {
    path: "/users.Users/FindUserByName";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<users_pb.FindUserByNameRequest>;
    requestDeserialize: grpc.deserialize<users_pb.FindUserByNameRequest>;
    responseSerialize: grpc.serialize<users_pb.FindUserByNameResponse>;
    responseDeserialize: grpc.deserialize<users_pb.FindUserByNameResponse>;
}

export const UsersService: IUsersService;

export interface IUsersServer {
    getUserByMailOrT: grpc.handleUnaryCall<users_pb.GetByMailOrTRequest, users_pb.GetUserResponse>;
    getUserByID: grpc.handleUnaryCall<users_pb.GetByIDRequest, users_pb.GetUserResponse>;
    findUserByName: grpc.handleUnaryCall<users_pb.FindUserByNameRequest, users_pb.FindUserByNameResponse>;
}

export interface IUsersClient {
    getUserByMailOrT(request: users_pb.GetByMailOrTRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByMailOrT(request: users_pb.GetByMailOrTRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByMailOrT(request: users_pb.GetByMailOrTRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: users_pb.GetByIDRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: users_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: users_pb.GetByIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: users_pb.FindUserByNameRequest, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: users_pb.FindUserByNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: users_pb.FindUserByNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
}

export class UsersClient extends grpc.Client implements IUsersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUserByMailOrT(request: users_pb.GetByMailOrTRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByMailOrT(request: users_pb.GetByMailOrTRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByMailOrT(request: users_pb.GetByMailOrTRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: users_pb.GetByIDRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: users_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: users_pb.GetByIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: users_pb.FindUserByNameRequest, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: users_pb.FindUserByNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: users_pb.FindUserByNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
}
