// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var users_users_pb = require('../users/users_pb.js');

function serialize_users_FindUserByNameRequest(arg) {
  if (!(arg instanceof users_users_pb.FindUserByNameRequest)) {
    throw new Error('Expected argument of type users.FindUserByNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_FindUserByNameRequest(buffer_arg) {
  return users_users_pb.FindUserByNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_FindUserByNameResponse(arg) {
  if (!(arg instanceof users_users_pb.FindUserByNameResponse)) {
    throw new Error('Expected argument of type users.FindUserByNameResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_FindUserByNameResponse(buffer_arg) {
  return users_users_pb.FindUserByNameResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetApproverInfoRequest(arg) {
  if (!(arg instanceof users_users_pb.GetApproverInfoRequest)) {
    throw new Error('Expected argument of type users.GetApproverInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetApproverInfoRequest(buffer_arg) {
  return users_users_pb.GetApproverInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetApproverInfoResponse(arg) {
  if (!(arg instanceof users_users_pb.GetApproverInfoResponse)) {
    throw new Error('Expected argument of type users.GetApproverInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetApproverInfoResponse(buffer_arg) {
  return users_users_pb.GetApproverInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetByIDRequest(arg) {
  if (!(arg instanceof users_users_pb.GetByIDRequest)) {
    throw new Error('Expected argument of type users.GetByIDRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetByIDRequest(buffer_arg) {
  return users_users_pb.GetByIDRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetByMailRequest(arg) {
  if (!(arg instanceof users_users_pb.GetByMailRequest)) {
    throw new Error('Expected argument of type users.GetByMailRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetByMailRequest(buffer_arg) {
  return users_users_pb.GetByMailRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetUserResponse(arg) {
  if (!(arg instanceof users_users_pb.GetUserResponse)) {
    throw new Error('Expected argument of type users.GetUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetUserResponse(buffer_arg) {
  return users_users_pb.GetUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsersService = exports.UsersService = {
  getUserByMail: {
    path: '/users.Users/GetUserByMail',
    requestStream: false,
    responseStream: false,
    requestType: users_users_pb.GetByMailRequest,
    responseType: users_users_pb.GetUserResponse,
    requestSerialize: serialize_users_GetByMailRequest,
    requestDeserialize: deserialize_users_GetByMailRequest,
    responseSerialize: serialize_users_GetUserResponse,
    responseDeserialize: deserialize_users_GetUserResponse,
  },
  getUserByID: {
    path: '/users.Users/GetUserByID',
    requestStream: false,
    responseStream: false,
    requestType: users_users_pb.GetByIDRequest,
    responseType: users_users_pb.GetUserResponse,
    requestSerialize: serialize_users_GetByIDRequest,
    requestDeserialize: deserialize_users_GetByIDRequest,
    responseSerialize: serialize_users_GetUserResponse,
    responseDeserialize: deserialize_users_GetUserResponse,
  },
  findUserByName: {
    path: '/users.Users/FindUserByName',
    requestStream: false,
    responseStream: false,
    requestType: users_users_pb.FindUserByNameRequest,
    responseType: users_users_pb.FindUserByNameResponse,
    requestSerialize: serialize_users_FindUserByNameRequest,
    requestDeserialize: deserialize_users_FindUserByNameRequest,
    responseSerialize: serialize_users_FindUserByNameResponse,
    responseDeserialize: deserialize_users_FindUserByNameResponse,
  },
  getApproverInfo: {
    path: '/users.Users/GetApproverInfo',
    requestStream: false,
    responseStream: false,
    requestType: users_users_pb.GetApproverInfoRequest,
    responseType: users_users_pb.GetApproverInfoResponse,
    requestSerialize: serialize_users_GetApproverInfoRequest,
    requestDeserialize: deserialize_users_GetApproverInfoRequest,
    responseSerialize: serialize_users_GetApproverInfoResponse,
    responseDeserialize: deserialize_users_GetApproverInfoResponse,
  },
};

exports.UsersClient = grpc.makeGenericClientConstructor(UsersService);
