import { IUser } from './users.interface';
import * as request from 'request-promise-native';

const baseUrl = `${process.env.KARTOFFEL_URL || 'http://localhost:4000'}/api/persons`;

export default class UsersService {
    /**
     * Gets a user by its ID from the provider
     * @param id - the user ID
     */
    static async getByID(id: string): Promise<IUser | null> {
        console.log(`Searching User with ID: ${id}`);
        try {
            const res = await request(`${baseUrl}/${id}`);
            return JSON.parse(res);
        } catch (err) {
            return null;
        }
    }

    static async getAll(): Promise<IUser[]> {
        const res = await request(`${baseUrl}`);
        return JSON.parse(res);
    }

    /**
     * Gets a user by one of his mail addresses
     * @param domainUser - a mail address
     */
    static async getByDomainUser(domainUser: string): Promise<IUser | null> {
        try {
            const res = await request(`${baseUrl}/domainUser/${domainUser}`);
            return JSON.parse(res);
        } catch (err) {
            console.log(`${domainUser} is not found`);
            return null;
        }
    }
}
