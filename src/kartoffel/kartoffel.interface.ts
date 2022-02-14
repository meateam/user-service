import { Types } from 'mongoose';
// Taken From Kartoffel

export interface IOrganizationGroup {
    id?: string;
    name: string;
    directManagers?: IKartoffelUser[] | string[];
    directMembers?: IKartoffelUser[] | string[];
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
    domain?: string;
    name?: string;
    dataSource?:string;
    uniqueID?: string;
    adfsUID?: string;
    personId?: Types.ObjectId | string | IKartoffelUser;
}

export interface IKartoffelUser {
    // Person's Basic information
    _id?:string;
    id: string;
    identityCard: string;
    personalNumber?: string;
    domainUsers: IDomainUser[];
    entityType: string;
    serviceType?: string;
    firstName: string;
    lastName: string;
    currentUnit?: string;
    alive?: boolean;
    dischargeDay?: Date;
    hierarchy: string[];
    hierarchyFlat?: string;
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
    // Calculated
    fullName?: string;
}

export interface IDigitalIdentity {
    type: string;
    source: string;
    mail: string;
    uniqueId: string;
    entityId: string;
    createdAt: Date;
    updatedAt: Date;
    isRoleAttachable: Boolean;
  }
  
  export interface IKartoffelUser2 {
    _id?: string;
    id: string;
    displayName: string;
    identityCard: string;
    digitalIdentities: IDigitalIdentity[];
    hierarchy: string;
    directGroup: string;
    ancestors: string[];
    entityType: string;
    phone: string[];
    mobilePhone: string[];
    personalNumber: string;
    serviceType: string;
    firstName: string;
    lastName: string;
    fullName: string;
    akaUnit: string;
    dischargeDay: Date;
    rank: string;
    mail: string;
    jobTitle: string;
    address?: string;
    clearance?: string;
    sex?: string;
    birthDate?: Date;
    updatedAt?: Date;
    createdAt?: Date;
    goalUserID?: string;
  }