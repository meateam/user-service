import { Types } from 'mongoose';
// Taken From Kartoffel

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
  
  export interface IKartoffelUserNew {
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