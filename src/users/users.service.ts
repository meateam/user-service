import { EXTERNAL_DESTS, IUser } from './users.interface';
import { Kartoffel } from '../kartoffel/kartoffel.intergation';
import { Phonebook } from '../phonebook/phonebook.intergation';
export class UserService {
    private kartoffel: Kartoffel;
    private phonebook: Phonebook;

    constructor() {
        this.kartoffel = new Kartoffel();
        this.phonebook = new Phonebook();
    }
    /**
     * Gets a user by its ID from the provider
     * @param id - the user ID
     */
    async getByID(id: string, destination?: string): Promise<IUser> {
        let user: IUser;
        switch (destination) {
            case EXTERNAL_DESTS.TOMCAL:
                user = await this.phonebook.getUserByID(id);
                break;
            default:
                user = await this.kartoffel.getByID(id, destination);
                break;
        }
        return user;
    }

    /**
     * Gets a user by one of his mail addresses
     * @param domainUser - a mail address
     */
    public async getByDomainUser(domainUser: string): Promise<IUser> {
        const user: IUser = await this.kartoffel.getByDomainUser(domainUser);
        return user;
    }

    /**
     * Search user suggestions by a partial name. returns a list of users ordered by resemblance score
     * @param partialName - the partial name to search by.
     */
    public async searchByName(partialName: string, destination?: string): Promise<IUser[]> {
        let users: IUser[];
        switch (destination) {
            case EXTERNAL_DESTS.TOMCAL:
                users = await this.phonebook.findUserByName(partialName);
                break;
            default:
                users = await this.kartoffel.searchByName(partialName, destination);
                break;
        }
        return users;
    }
}
