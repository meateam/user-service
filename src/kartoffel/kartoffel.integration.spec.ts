// Integration Tests
import { describe } from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { Kartoffel } from './kartoffel.intergation';
import { IKartoffelUser } from './kartoffel.interface';
import { UserNotFoundError } from '../utils/errors';
import { IUser } from '../users/users.interface';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(chaiAsPromised);

const user_1: IKartoffelUser = {
    akaUnit: '',
    ancestors: [],
    displayName: '',
    serviceType: '',
    jobTitle: 'רוצח',
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
    dischargeDay: new Date('2022-11-30T22:00:00.000Z'),
    directGroup: '5d6f88e7f7709b8b73df3faf',
    rank: 'mega',
    mail: 't23456789@jello.com',
    address: 'רחוב הממתקים 34',
    hierarchy: 'parentGroup/childGroup1/childGroup1-1',
    createdAt: new Date('2019-09-04T10:20:05.689Z'),
    updatedAt: new Date('2019-09-11T11:06:05.185Z'),
    digitalIdentities: [{
        uniqueId: 'Cleta95@jello',
        source: 'Cleta95@jellouid',
        type: 'email',
        mail: '',
        entityId: '5d6f8fd5f7709b8b73df3fb2',
        isRoleAttachable: true,
        createdAt: new Date('2019-09-04T10:20:05.689Z'),
        updatedAt: new Date('2019-09-11T11:06:05.185Z'),
    }],
    fullName: 'נייטרו הגלטין',
    id: '5d6f8fd5f7709b8b73df3fb2',
};

const fakeUserId = '5c8f5f3c039b31198058d812';
const fakeUserMail = 'apple@kuchen';
const fakeUserName = 'dkdldl';

describe('Spike and Kartoffel Integration', () => {

    let KartoffelService: Kartoffel;

    before(async () => {
        KartoffelService = new Kartoffel();
    });

    describe('Kartoffel', () => {
        describe('Get user by id', () => {
            it('should return null if the user does not exist', async () => {
                await expect(KartoffelService.getByID(fakeUserId)).to.eventually.be.rejectedWith(UserNotFoundError);
            });
            it('Should return a user by id', async () => {
                const user: IUser = await KartoffelService.getByID(user_1.id);
                expect(user).to.exist;
                expect(user).to.have.property('id', user_1.id);
                expect(user).to.have.property('firstName', user_1.firstName);
                expect(user).to.have.property('lastName', user_1.lastName);
            });
        });

        describe('Get user by mail', () => {
            it('should return null if the user does not exist', async () => {
                await expect(KartoffelService.getByID(fakeUserMail)).to.eventually.be.rejectedWith(UserNotFoundError);
            });
            it('Should return a user by domain-user id', async () => {
                const user: IUser = await KartoffelService.getByDomainUser(<string>user_1.digitalIdentities[0].uniqueId);
                expect(user).to.exist;
                expect(user).to.have.property('id', user_1.id);
                expect(user).to.have.property('firstName', user_1.firstName);
                expect(user).to.have.property('lastName', user_1.lastName);
            });
        });

        describe('Get user by partial name', () => {
            it('should return null if the user does not exist', async () => {
                await expect(KartoffelService.searchByName(fakeUserName)).to.eventually.be.rejectedWith(UserNotFoundError);
            });
            it('Should return a user by partial name', async () => {
                const user: IUser[] = await KartoffelService.searchByName(user_1.firstName);
                expect(user[0]).to.exist;
                expect(user[0]).to.have.property('id', user_1.id);
                expect(user[0]).to.have.property('firstName', user_1.firstName);
                expect(user[0]).to.have.property('lastName', user_1.lastName);
            });
        });
    });
});
