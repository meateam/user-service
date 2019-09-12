import { describe } from 'mocha';
import { expect } from 'chai';
import nock = require('nock');
import { IUser } from './users.interface';
import { UsersService } from './users.service';
// import supertest = require('supertest');
// import { Server } from '../server';

const user_1: IUser = {
    _id: '5c8f5f3c039b31198058d812',
    updatedAt: new Date('2019-03-18T09:05:00.808Z'),
    createdAt: new Date('2019-03-18T09:05:00.203Z'),
    identityCard: '456789122',
    personalNumber: '5671234',
    firstName: 'Tiki',
    lastName: 'Poor',
    dischargeDay: new Date('2022-11-30T22:00:00.000Z'),
    entityType: 'digimon',
    directGroup: '5c8f5f3b039b31198058d811',
    hierarchy: [
        'uniqueAndSpecialName',
    ],
    primaryDomainUser: {
        uniqueID: 'nitro@jello',
        adfsUID: 'nitro@jellouid',
        domain: 'myDomain',
        name: 'Tiki Poor',
    },
    clearance: '0',
    mobilePhone: [],
    phone: [],
    responsibility: 'none',
    job: 'cosmetician 1',
    alive: true,
    secondaryDomainUsers: [],
    fullName: 'Tiki Poor',
    id: '5c8f5f3c039b31198058d812',
};

describe('User Router', () => {
    const API_URL = `${process.env.KARTOFFEL_URL || 'http://localhost:4000'}`;

    before(() => {
        /*
            Mock API using nock for the REST API
            Endpoint. Any calls to Kartoffel's URL
            will be intercepted by the nock
        */
        nock(API_URL)
            .get('/api/persons')
            .reply(200, [user_1])
            .get(`/api/persons/${user_1.id}`)
            .reply(200, user_1)
            .get(`/api/persons/domainUser/${user_1.primaryDomainUser.uniqueID}`)
            .reply(200, user_1);
    });

    describe('Get User by ID', () => {
        it('Should return a user by id', async () => {
            const user = await UsersService.getByID(user_1.id);
            expect(user).to.exist;
            expect(user).to.be.an('object');
            expect(user).to.have.property('id', user_1.id);
            expect(user).to.have.property('firstName', user_1.firstName);
            expect(user).to.have.property('lastName', user_1.lastName);
        });
        it('Should return null if user doesn\'t exist', async () => {
            const user = await UsersService.getByID('1234567');
            expect(user).to.not.exist;
        });
    });

    describe('Get User by DomainUser', () => {
        it('Should return a user by domain-user id', async () => {
            const user = await UsersService.getByDomainUser(<string>user_1.primaryDomainUser.uniqueID);
            expect(user).to.exist;
            expect(user).to.be.an('object');
            expect(user).to.have.property('id', user_1.id);
            expect(user).to.have.property('firstName', user_1.firstName);
            expect(user).to.have.property('lastName', user_1.lastName);
        });
        it('should return null if the user doensn\'t exist', async () => {
            const user = await UsersService.getByDomainUser('1234567');
            expect(user).to.not.exist;
        });
    });

    after(() => {
        nock.cleanAll();
    });
});
