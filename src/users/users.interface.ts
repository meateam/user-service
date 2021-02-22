import { IDomainUser } from "../kartoffel/kartoffel.interface";

export interface IUser {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    hierarchy?: string[];
    hierarchyFlat: string;
    mail: string;
    // domainUser?: IDomainUser;
}

export enum EXTERNAL_DESTS {
    z='z', 
    c='c'
};