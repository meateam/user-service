// package: users
// file: users/users.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as users_users_pb from "../users/users_pb";

interface IUsersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUserByMail: IUsersService_IGetUserByMail;
    getUserByID: IUsersService_IGetUserByID;
    findUserByName: IUsersService_IFindUserByName;
    getApproverInfo: IUsersService_IGetApproverInfo;
}

interface IUsersService_IGetUserByMail extends grpc.MethodDefinition<users_users_pb.GetByMailRequest, users_users_pb.GetUserResponse> {
    path: string; // "/users.Users/GetUserByMail"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_users_pb.GetByMailRequest>;
    requestDeserialize: grpc.deserialize<users_users_pb.GetByMailRequest>;
    responseSerialize: grpc.serialize<users_users_pb.GetUserResponse>;
    responseDeserialize: grpc.deserialize<users_users_pb.GetUserResponse>;
}
interface IUsersService_IGetUserByID extends grpc.MethodDefinition<users_users_pb.GetByIDRequest, users_users_pb.GetUserResponse> {
    path: string; // "/users.Users/GetUserByID"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_users_pb.GetByIDRequest>;
    requestDeserialize: grpc.deserialize<users_users_pb.GetByIDRequest>;
    responseSerialize: grpc.serialize<users_users_pb.GetUserResponse>;
    responseDeserialize: grpc.deserialize<users_users_pb.GetUserResponse>;
}
interface IUsersService_IFindUserByName extends grpc.MethodDefinition<users_users_pb.FindUserByNameRequest, users_users_pb.FindUserByNameResponse> {
    path: string; // "/users.Users/FindUserByName"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_users_pb.FindUserByNameRequest>;
    requestDeserialize: grpc.deserialize<users_users_pb.FindUserByNameRequest>;
    responseSerialize: grpc.serialize<users_users_pb.FindUserByNameResponse>;
    responseDeserialize: grpc.deserialize<users_users_pb.FindUserByNameResponse>;
}
interface IUsersService_IGetApproverInfo extends grpc.MethodDefinition<users_users_pb.GetApproverInfoRequest, users_users_pb.GetApproverInfoResponse> {
    path: string; // "/users.Users/GetApproverInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_users_pb.GetApproverInfoRequest>;
    requestDeserialize: grpc.deserialize<users_users_pb.GetApproverInfoRequest>;
    responseSerialize: grpc.serialize<users_users_pb.GetApproverInfoResponse>;
    responseDeserialize: grpc.deserialize<users_users_pb.GetApproverInfoResponse>;
}

export const UsersService: IUsersService;

export interface IUsersServer {
    getUserByMail: grpc.handleUnaryCall<users_users_pb.GetByMailRequest, users_users_pb.GetUserResponse>;
    getUserByID: grpc.handleUnaryCall<users_users_pb.GetByIDRequest, users_users_pb.GetUserResponse>;
    findUserByName: grpc.handleUnaryCall<users_users_pb.FindUserByNameRequest, users_users_pb.FindUserByNameResponse>;
    getApproverInfo: grpc.handleUnaryCall<users_users_pb.GetApproverInfoRequest, users_users_pb.GetApproverInfoResponse>;
}

export interface IUsersClient {
    getUserByMail(request: users_users_pb.GetByMailRequest, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByMail(request: users_users_pb.GetByMailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByMail(request: users_users_pb.GetByMailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: users_users_pb.GetByIDRequest, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: users_users_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    getUserByID(request: users_users_pb.GetByIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: users_users_pb.FindUserByNameRequest, callback: (error: grpc.ServiceError | null, response: users_users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: users_users_pb.FindUserByNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    findUserByName(request: users_users_pb.FindUserByNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    getApproverInfo(request: users_users_pb.GetApproverInfoRequest, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    getApproverInfo(request: users_users_pb.GetApproverInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    getApproverInfo(request: users_users_pb.GetApproverInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
}

export class UsersClient extends grpc.Client implements IUsersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUserByMail(request: users_users_pb.GetByMailRequest, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByMail(request: users_users_pb.GetByMailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByMail(request: users_users_pb.GetByMailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: users_users_pb.GetByIDRequest, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: users_users_pb.GetByIDRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public getUserByID(request: users_users_pb.GetByIDRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: users_users_pb.FindUserByNameRequest, callback: (error: grpc.ServiceError | null, response: users_users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: users_users_pb.FindUserByNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    public findUserByName(request: users_users_pb.FindUserByNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_users_pb.FindUserByNameResponse) => void): grpc.ClientUnaryCall;
    public getApproverInfo(request: users_users_pb.GetApproverInfoRequest, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    public getApproverInfo(request: users_users_pb.GetApproverInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    public getApproverInfo(request: users_users_pb.GetApproverInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
}
