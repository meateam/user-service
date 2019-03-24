import { IUsers } from './users.interface';
import * as request from 'request-promise-native';

const baseUrl = `${process.env.KARTOFFEL_URL || 'http://localhost:4000'}/api/persons`;

export class UsersService {
    static async getByID(id: string): Promise<IUsers | null> {
        const res = await request(`${baseUrl}/${id}`);
        return JSON.parse(res);
    }

    static async getAll(): Promise<IUsers | null> {
        const res = await request(`${baseUrl}`);
        return JSON.parse(res);
    }
    static async getByDomainUser(domainUser: string): Promise<IUsers | null> {
        const res = await request(`${baseUrl}/domainUser/${domainUser}`);
        return JSON.parse(res);
    }
}
