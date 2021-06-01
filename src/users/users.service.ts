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
     * @param destination? - optional param that identify the external destination, if not mentioned look in non-external network
     */
    async getByID(id: string, destination?: string): Promise<IUser> {
        let user: IUser;
        switch (destination) {
        case EXTERNAL_DESTS.TOMCAL as any as string:
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
     *  @param destination? - optional param that identify the external destination, if not mentioned look in non-external network
     */
    public async getByDomainUser(domainUser: string, destination?: string): Promise<IUser> {
        const user: IUser = await this.kartoffel.getByDomainUser(domainUser, destination);
        return user;
    }

    /**
     * Search user suggestions by a partial name. returns a list of users ordered by resemblance score
     * @param partialName - the partial name to search by.
     * @param destination? - optional param that identify the external destination, if not mentioned look in non-external network
     */
    public async searchByName(partialName: string, destination?: string): Promise<IUser[]> {
        let users: IUser[];
        switch (destination) {
        case EXTERNAL_DESTS.TOMCAL as any as string:
            users = await this.phonebook.findUserByName(partialName);
            break;
        default:
            users = await this.kartoffel.searchByName(partialName, destination);
            break;
        }
        return users;
    }
}
