// Integration Tests

import { describe } from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { Kartoffel } from './users.service';
import { IUser } from './users.interface';
import { UserNotFoundError } from '../utils/errors';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(chaiAsPromised);

const user_1: IUser = {
    alive: true,
    job: 'רוצח',
    responsibility: 'none',
    phone: [
        '02-6426784',
    ],
    mobilePhone: [
        '052-1234567',
    ],
    clearance: '0',
    _id: '5d6f8fd5f7709b8b73df3fb2',
    identityCard: '21610233',
    personalNumber: '5456785',
    entityType: 'tamar',
    firstName: 'נייטרו',
    lastName: 'הגלטין',
    currentUnit: 'יחידת ביג מאם',
    dischargeDay: new Date('2022-11-30T22:00:00.000Z'),
    directGroup: '5d6f88e7f7709b8b73df3faf',
    rank: 'mega',
    mail: 't23456789@jello.com',
    address: 'רחוב הממתקים 34',
    hierarchy: [
        'parentGroup',
        'childGroup1',
        'childGroup1-1',
    ],
    createdAt: new Date('2019-09-04T10:20:05.689Z'),
    updatedAt: new Date('2019-09-11T11:06:05.185Z'),
    domainUsers: [{
        uniqueID: 'Cleta95@jello',
        adfsUID: 'Cleta95@jellouid',
    }],
    fullName: 'נייטרו הגלטין',
    id: '5d6f8fd5f7709b8b73df3fb2',
};

const fakeUserId = '5c8f5f3c039b31198058d812';
const fakeUserMail = 'apple@kuchen';

describe('Spike and Kartoffel Integration', () => {

    let UsersService: Kartoffel;

    before(async () => {
        UsersService = new Kartoffel();
    });

    describe('Kartoffel', () => {
        describe('Get user by id', () => {
            it('should return null if the user does not exist', async () => {
                await expect(UsersService.getByID(fakeUserId)).to.eventually.be.rejectedWith(UserNotFoundError);
            });
            it('Should return a user by id', async () => {
                const user: IUser = await UsersService.getByID(user_1.id);
                expect(user).to.exist;
                expect(user).to.have.property('id', user_1.id);
                expect(user).to.have.property('firstName', user_1.firstName);
                expect(user).to.have.property('lastName', user_1.lastName);
            });
        });

        describe('Get user by mail', () => {
            it('should return null if the user does not exist', async () => {
                await expect(UsersService.getByID(fakeUserMail)).to.eventually.be.rejectedWith(UserNotFoundError);
            });
            it('Should return a user by domain-user id', async () => {
                const user: IUser = await UsersService.getByDomainUser(<string>user_1.domainUsers[0].uniqueID);
                expect(user).to.exist;
                expect(user).to.have.property('id', user_1.id);
                expect(user).to.have.property('firstName', user_1.firstName);
                expect(user).to.have.property('lastName', user_1.lastName);
            });
        });
    });
});
