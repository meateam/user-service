// package: spike
// file: spike/spike.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as spike_spike_pb from "../spike/spike_pb";

interface ISpikeService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getSpikeToken: ISpikeService_IGetSpikeToken;
    validateToken: ISpikeService_IValidateToken;
}

interface ISpikeService_IGetSpikeToken extends grpc.MethodDefinition<spike_spike_pb.GetSpikeTokenRequest, spike_spike_pb.SpikeToken> {
    path: string; // "/spike.Spike/GetSpikeToken"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<spike_spike_pb.GetSpikeTokenRequest>;
    requestDeserialize: grpc.deserialize<spike_spike_pb.GetSpikeTokenRequest>;
    responseSerialize: grpc.serialize<spike_spike_pb.SpikeToken>;
    responseDeserialize: grpc.deserialize<spike_spike_pb.SpikeToken>;
}
interface ISpikeService_IValidateToken extends grpc.MethodDefinition<spike_spike_pb.ValidateTokenRequest, spike_spike_pb.ValidateTokenResponse> {
    path: string; // "/spike.Spike/ValidateToken"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<spike_spike_pb.ValidateTokenRequest>;
    requestDeserialize: grpc.deserialize<spike_spike_pb.ValidateTokenRequest>;
    responseSerialize: grpc.serialize<spike_spike_pb.ValidateTokenResponse>;
    responseDeserialize: grpc.deserialize<spike_spike_pb.ValidateTokenResponse>;
}

export const SpikeService: ISpikeService;

export interface ISpikeServer {
    getSpikeToken: grpc.handleUnaryCall<spike_spike_pb.GetSpikeTokenRequest, spike_spike_pb.SpikeToken>;
    validateToken: grpc.handleUnaryCall<spike_spike_pb.ValidateTokenRequest, spike_spike_pb.ValidateTokenResponse>;
}

export interface ISpikeClient {
    getSpikeToken(request: spike_spike_pb.GetSpikeTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    getSpikeToken(request: spike_spike_pb.GetSpikeTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    getSpikeToken(request: spike_spike_pb.GetSpikeTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    validateToken(request: spike_spike_pb.ValidateTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    validateToken(request: spike_spike_pb.ValidateTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    validateToken(request: spike_spike_pb.ValidateTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
}

export class SpikeClient extends grpc.Client implements ISpikeClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getSpikeToken(request: spike_spike_pb.GetSpikeTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    public getSpikeToken(request: spike_spike_pb.GetSpikeTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    public getSpikeToken(request: spike_spike_pb.GetSpikeTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.SpikeToken) => void): grpc.ClientUnaryCall;
    public validateToken(request: spike_spike_pb.ValidateTokenRequest, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    public validateToken(request: spike_spike_pb.ValidateTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    public validateToken(request: spike_spike_pb.ValidateTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: spike_spike_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
}
