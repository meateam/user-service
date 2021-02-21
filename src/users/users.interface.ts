export interface IUser {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    hierarchy?: string[];
    hierarchyFlat: string;
    mail: string;
}

export const enum EXTERNAL_DESTS {
    PHONEBOOK='phonebook', 
    CTS='cts'
};