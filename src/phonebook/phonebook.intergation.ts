import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { PhoneBookError, UserNotFoundError, ApplicationError } from '../utils/errors';
import { phoneBookURL } from '../config';
import { IUser } from '../users/users.interface';
import { IPhoneBookUser } from './phonebook.interface';

export class Phonebook {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({ baseURL: `${phoneBookURL}/persons` });
    }

    async getUserByID(id: string): Promise<IUser> {
        let res: AxiosResponse;
        try {
           res = await this.instance.get(`/${id}`);
        } catch (err) {
            if (err.response && err.response.status) {
                const statusCode: number = err.response.status;
                if (statusCode === 404) {
                    throw new UserNotFoundError(`The user with id ${id} is not found`);
                }
                throw new PhoneBookError(`Error in contacting the phonebook : ${JSON.stringify(err)}`);
            }
            throw new ApplicationError(`Unknown error while in contacting the phonebook : ${err}`);
        }

        const userDataPhoneBook: IPhoneBookUser = res.data;
        const user: IUser = setUser(userDataPhoneBook);
        return user;
    }

    async findUserByName(partialName: string): Promise<IUser[]> {
        let res: AxiosResponse;
        try {
            res = await this.instance.get('/search', { params: { fullname: partialName } });
        } catch (err) {
            throw new ApplicationError(`Unknown error while in contacting the phonebook : ${err}`);
        }

        const usersData: IPhoneBookUser[] = res.data;
        const users: IUser[] = [];
        usersData.forEach((userData) => { users.push(setUser(userData)); });

       return users;
    }

}

function setUser(userData: IPhoneBookUser): IUser {
    const user: IUser = {
        id: userData.id,
        mail: userData.mail,
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`,
        hierarchyFlat: userData.displayName
    };

    return user;
}
