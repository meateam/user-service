// package: users
// file: users.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetByMailOrTRequest extends jspb.Message { 
    getMailort(): string;
    setMailort(value: string): GetByMailOrTRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByMailOrTRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetByMailOrTRequest): GetByMailOrTRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByMailOrTRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByMailOrTRequest;
    static deserializeBinaryFromReader(message: GetByMailOrTRequest, reader: jspb.BinaryReader): GetByMailOrTRequest;
}

export namespace GetByMailOrTRequest {
    export type AsObject = {
        mailort: string,
    }
}

export class GetByIDRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): GetByIDRequest;
    getDestination(): string;
    setDestination(value: string): GetByIDRequest;

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
        destination: string,
    }
}

export class User extends jspb.Message { 
    getId(): string;
    setId(value: string): User;
    getMail(): string;
    setMail(value: string): User;
    getFirstname(): string;
    setFirstname(value: string): User;
    getLastname(): string;
    setLastname(value: string): User;
    getFullname(): string;
    setFullname(value: string): User;
    clearHierarchyList(): void;
    getHierarchyList(): Array<string>;
    setHierarchyList(value: Array<string>): User;
    addHierarchy(value: string, index?: number): string;
    getHierarchyflat(): string;
    setHierarchyflat(value: string): User;
    getAdfsid(): string;
    setAdfsid(value: string): User;

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
        adfsid: string,
    }
}

export class GetUserResponse extends jspb.Message { 

    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): GetUserResponse;

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
    setName(value: string): FindUserByNameRequest;
    getDestination(): string;
    setDestination(value: string): FindUserByNameRequest;

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
        destination: string,
    }
}

export class FindUserByNameResponse extends jspb.Message { 
    clearUsersList(): void;
    getUsersList(): Array<User>;
    setUsersList(value: Array<User>): FindUserByNameResponse;
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
