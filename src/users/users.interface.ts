import { ctsDest, tomcalDest } from '../config';

export interface IUser {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    hierarchy?: string[];
    hierarchyFlat: string;
    mail: string;
}

export enum EXTERNAL_DESTS {
  TOMCAL = tomcalDest as any,
  CTS = ctsDest as any,
}
