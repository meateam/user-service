// Integration Tests
import { describe } from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { Phonebook } from './phonebook.intergation';
import { IPhoneBookUser } from './phonebook.interface';
import { UserNotFoundError } from '../utils/errors';
import { IUser } from '../users/users.interface';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(chaiAsPromised);

const user_1: IPhoneBookUser = {
    _id: '603225b9600c09004419be48',
    firstName: 'מנשה',
    lastName: 'הקוף',
    rank: 'undefined',
    armyId: 's0000001',
    mail: 's0000001@example.com',
    displayName: 'מנשה הקוף',
    id: 's0000001',
};

const fakeUserId = '5c8f5f3c039b31198058d812';
const fakeUserName = 'נט';

describe('PhoneBook Integration', () => {

    let PhonebookService: Phonebook;

    before(async () => {
        PhonebookService = new Phonebook();
    });

    describe('Phonebook', () => {
        describe('Get user by id', () => {
            it('should return null if the user does not exist', async () => {
                await expect(PhonebookService.getUserByID(fakeUserId)).to.eventually.be.rejectedWith(UserNotFoundError);
            });
            it('Should return a user by id', async () => {
                const user: IUser = await PhonebookService.getUserByID(user_1.id);
                expect(user).to.exist;
                expect(user).to.have.property('id', user_1.id);
                expect(user).to.have.property('firstName', user_1.firstName);
                expect(user).to.have.property('lastName', user_1.lastName);
            });
        });

        describe('Find by name', () => {
            it('should return null if the user does not exist', async () => {
                await expect(PhonebookService.findUserByName(fakeUserName)).to.eventually.be.rejectedWith(UserNotFoundError);
            });
            it('Should return a user by partial name', async () => {
                const user: IUser[] = await PhonebookService.findUserByName(user_1.firstName);
                expect(user[0]).to.exist;
                expect(user[0]).to.have.property('id', user_1.id);
                expect(user[0]).to.have.property('firstName', user_1.firstName);
                expect(user[0]).to.have.property('lastName', user_1.lastName);
            });
        });
    });
});
