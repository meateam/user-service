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
    getApproverInfo: IUsersService_IGetApproverInfo;
    canApproveToUser: IUsersService_ICanApproveToUser;
}

interface IUsersService_IGetUserByMailOrT extends grpc.MethodDefinition<users_pb.GetByMailOrTRequest, users_pb.GetUserResponse> {
    path: string; // "/users.Users/GetUserByMailOrT"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_pb.GetByMailOrTRequest>;
    requestDeserialize: grpc.deserialize<users_pb.GetByMailOrTRequest>;
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
interface IUsersService_IGetApproverInfo extends grpc.MethodDefinition<users_pb.GetApproverInfoRequest, users_pb.GetApproverInfoResponse> {
    path: string; // "/users.Users/GetApproverInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_pb.GetApproverInfoRequest>;
    requestDeserialize: grpc.deserialize<users_pb.GetApproverInfoRequest>;
    responseSerialize: grpc.serialize<users_pb.GetApproverInfoResponse>;
    responseDeserialize: grpc.deserialize<users_pb.GetApproverInfoResponse>;
}
interface IUsersService_ICanApproveToUser extends grpc.MethodDefinition<users_pb.CanApproveToUserRequest, users_pb.CanApproveToUserResponse> {
    path: string; // "/users.Users/CanApproveToUser"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<users_pb.CanApproveToUserRequest>;
    requestDeserialize: grpc.deserialize<users_pb.CanApproveToUserRequest>;
    responseSerialize: grpc.serialize<users_pb.CanApproveToUserResponse>;
    responseDeserialize: grpc.deserialize<users_pb.CanApproveToUserResponse>;
}

export const UsersService: IUsersService;

export interface IUsersServer {
    getUserByMailOrT: grpc.handleUnaryCall<users_pb.GetByMailOrTRequest, users_pb.GetUserResponse>;
    getUserByID: grpc.handleUnaryCall<users_pb.GetByIDRequest, users_pb.GetUserResponse>;
    findUserByName: grpc.handleUnaryCall<users_pb.FindUserByNameRequest, users_pb.FindUserByNameResponse>;
    getApproverInfo: grpc.handleUnaryCall<users_pb.GetApproverInfoRequest, users_pb.GetApproverInfoResponse>;
    canApproveToUser: grpc.handleUnaryCall<users_pb.CanApproveToUserRequest, users_pb.CanApproveToUserResponse>;
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
    getApproverInfo(request: users_pb.GetApproverInfoRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    getApproverInfo(request: users_pb.GetApproverInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    getApproverInfo(request: users_pb.GetApproverInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    canApproveToUser(request: users_pb.CanApproveToUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    canApproveToUser(request: users_pb.CanApproveToUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    canApproveToUser(request: users_pb.CanApproveToUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
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
    public getApproverInfo(request: users_pb.GetApproverInfoRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    public getApproverInfo(request: users_pb.GetApproverInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    public getApproverInfo(request: users_pb.GetApproverInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    public canApproveToUser(request: users_pb.CanApproveToUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    public canApproveToUser(request: users_pb.CanApproveToUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    public canApproveToUser(request: users_pb.CanApproveToUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
}
