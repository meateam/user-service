// package: users
// file: users/users.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetByMailRequest extends jspb.Message { 
    getMail(): string;
    setMail(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByMailRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetByMailRequest): GetByMailRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByMailRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByMailRequest;
    static deserializeBinaryFromReader(message: GetByMailRequest, reader: jspb.BinaryReader): GetByMailRequest;
}

export namespace GetByMailRequest {
    export type AsObject = {
        mail: string,
    }
}

export class GetByIDRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByIDRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetByIDRequest): GetByIDRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByIDRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByIDRequest;
    static deserializeBinaryFromReader(message: GetByIDRequest, reader: jspb.BinaryReader): GetByIDRequest;
}

export namespace GetByIDRequest {
    export type AsObject = {
        id: string,
    }
}

export class User extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getMail(): string;
    setMail(value: string): void;

    getFirstname(): string;
    setFirstname(value: string): void;

    getLastname(): string;
    setLastname(value: string): void;

    getFullname(): string;
    setFullname(value: string): void;

    clearHierarchyList(): void;
    getHierarchyList(): Array<string>;
    setHierarchyList(value: Array<string>): void;
    addHierarchy(value: string, index?: number): string;

    getHierarchyflat(): string;
    setHierarchyflat(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: string,
        mail: string,
        firstname: string,
        lastname: string,
        fullname: string,
        hierarchyList: Array<string>,
        hierarchyflat: string,
    }
}

export class Unit extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    clearApproversList(): void;
    getApproversList(): Array<string>;
    setApproversList(value: Array<string>): void;
    addApprovers(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Unit.AsObject;
    static toObject(includeInstance: boolean, msg: Unit): Unit.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Unit, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Unit;
    static deserializeBinaryFromReader(message: Unit, reader: jspb.BinaryReader): Unit;
}

export namespace Unit {
    export type AsObject = {
        name: string,
        approversList: Array<string>,
    }
}

export class ApproverInfo extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): void;

    getIsadmin(): boolean;
    setIsadmin(value: boolean): void;

    getIsapprover(): boolean;
    setIsapprover(value: boolean): void;

    getIsblocked(): boolean;
    setIsblocked(value: boolean): void;


    hasUnit(): boolean;
    clearUnit(): void;
    getUnit(): Unit | undefined;
    setUnit(value?: Unit): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ApproverInfo.AsObject;
    static toObject(includeInstance: boolean, msg: ApproverInfo): ApproverInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ApproverInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ApproverInfo;
    static deserializeBinaryFromReader(message: ApproverInfo, reader: jspb.BinaryReader): ApproverInfo;
}

export namespace ApproverInfo {
    export type AsObject = {
        userid: string,
        isadmin: boolean,
        isapprover: boolean,
        isblocked: boolean,
        unit?: Unit.AsObject,
    }
}

export class GetUserResponse extends jspb.Message { 

    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserResponse): GetUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserResponse;
    static deserializeBinaryFromReader(message: GetUserResponse, reader: jspb.BinaryReader): GetUserResponse;
}

export namespace GetUserResponse {
    export type AsObject = {
        user?: User.AsObject,
    }
}

export class FindUserByNameRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FindUserByNameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FindUserByNameRequest): FindUserByNameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FindUserByNameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FindUserByNameRequest;
    static deserializeBinaryFromReader(message: FindUserByNameRequest, reader: jspb.BinaryReader): FindUserByNameRequest;
}

export namespace FindUserByNameRequest {
    export type AsObject = {
        name: string,
    }
}

export class FindUserByNameResponse extends jspb.Message { 
    clearUsersList(): void;
    getUsersList(): Array<User>;
    setUsersList(value: Array<User>): void;
    addUsers(value?: User, index?: number): User;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FindUserByNameResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FindUserByNameResponse): FindUserByNameResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FindUserByNameResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FindUserByNameResponse;
    static deserializeBinaryFromReader(message: FindUserByNameResponse, reader: jspb.BinaryReader): FindUserByNameResponse;
}

export namespace FindUserByNameResponse {
    export type AsObject = {
        usersList: Array<User.AsObject>,
    }
}

export class GetApproverInfoRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetApproverInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetApproverInfoRequest): GetApproverInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetApproverInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetApproverInfoRequest;
    static deserializeBinaryFromReader(message: GetApproverInfoRequest, reader: jspb.BinaryReader): GetApproverInfoRequest;
}

export namespace GetApproverInfoRequest {
    export type AsObject = {
        id: string,
    }
}

export class GetApproverInfoResponse extends jspb.Message { 

    hasApproverinfo(): boolean;
    clearApproverinfo(): void;
    getApproverinfo(): ApproverInfo | undefined;
    setApproverinfo(value?: ApproverInfo): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetApproverInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetApproverInfoResponse): GetApproverInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetApproverInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetApproverInfoResponse;
    static deserializeBinaryFromReader(message: GetApproverInfoResponse, reader: jspb.BinaryReader): GetApproverInfoResponse;
}

export namespace GetApproverInfoResponse {
    export type AsObject = {
        approverinfo?: ApproverInfo.AsObject,
    }
}

export class CanApproveToUserRequest extends jspb.Message { 
    getApproverid(): string;
    setApproverid(value: string): void;

    getUserid(): string;
    setUserid(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CanApproveToUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CanApproveToUserRequest): CanApproveToUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CanApproveToUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CanApproveToUserRequest;
    static deserializeBinaryFromReader(message: CanApproveToUserRequest, reader: jspb.BinaryReader): CanApproveToUserRequest;
}

export namespace CanApproveToUserRequest {
    export type AsObject = {
        approverid: string,
        userid: string,
    }
}

export class CanApproveToUserResponse extends jspb.Message { 
    getCanapprovetouser(): boolean;
    setCanapprovetouser(value: boolean): void;

    clearCantapprovereasonsList(): void;
    getCantapprovereasonsList(): Array<string>;
    setCantapprovereasonsList(value: Array<string>): void;
    addCantapprovereasons(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CanApproveToUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CanApproveToUserResponse): CanApproveToUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CanApproveToUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CanApproveToUserResponse;
    static deserializeBinaryFromReader(message: CanApproveToUserResponse, reader: jspb.BinaryReader): CanApproveToUserResponse;
}

export namespace CanApproveToUserResponse {
    export type AsObject = {
        canapprovetouser: boolean,
        cantapprovereasonsList: Array<string>,
    }
}
