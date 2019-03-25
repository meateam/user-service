import { IUser } from './users.interface';
import { UsersNotFoundError } from '../utils/errors/userErrors';
import * as request from 'request-promise-native';

const baseUrl = `${process.env.KARTOFFEL_URL || 'http://localhost:4000'}/api/persons`;

export class UsersService {
    static async getByID(id: string): Promise<IUser | null> {
        console.log(`Searching User with ID: ${id}`);
        try {
            const res = await request(`${baseUrl}/${id}`);
            return JSON.parse(res);
        } catch (err) {
            return null;
        }
    }

    static async getAll(): Promise<IUser | null> {
        const res = await request(`${baseUrl}`);
        return JSON.parse(res);
    }

    static async getByDomainUser(domainUser: string): Promise<IUser | null> {
        try {
            const res = await request(`${baseUrl}/domainUser/${domainUser}`);
            return JSON.parse(res);
        } catch (err) {
            return null;
        }
    }
}
