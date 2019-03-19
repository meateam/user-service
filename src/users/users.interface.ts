import { Types } from 'mongoose';
// Taken From Kartoffel

export interface IOrganizationGroup {
    id?: string;
    name: string;
    directManagers?: IUsers[] | string[];
    directMembers?: IUsers[] | string[];
    createdAt: Date;
    updatedAt?: Date;
    ancestors?: string[];
    children?: IOrganizationGroup[] | string[];
    hierarchy?: string[];
    isALeaf?: boolean;
    isAlive?: boolean;
}

export interface IDomainUser {
    id?: string;
    domain: string;
    name: string;
    uniqueID?: string;
    adfsUID?: string;
    personId?: Types.ObjectId | string | IUsers;
}

export interface IUsers {
    // Person's Basic information
    id?: string;
    identityCard: string;
    personalNumber?: string;
    primaryDomainUser?: string | Types.ObjectId | IDomainUser;
    secondaryDomainUsers?:  string[] | Types.ObjectId[] | IDomainUser[];
    entityType: string;
    serviceType?: string;
    firstName: string;
    lastName: string;
    currentUnit?: string;
    alive?: boolean;
    dischargeDay?: Date;
    hierarchy?: string[];
    directGroup: string | Types.ObjectId | IOrganizationGroup;
    managedGroup?: string | Types.ObjectId | IOrganizationGroup;
    rank?: string;
    updatedAt?: Date;
    createdAt?: Date;
    // Editable by the Person
    job: string;
    mail?: string;
    phone?: string[];
    mobilePhone?: string[];
    address?: string;
    // Editable with strong permissions
    responsibility?: string;
    responsibilityLocation?: string | Types.ObjectId | IOrganizationGroup;
    clearance?: string;
}
