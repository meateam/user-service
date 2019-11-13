import * as request from 'supertest';
import { describe } from 'mocha';
import { expect } from 'chai';
import nock = require('nock');
import { IUser } from './users.interface';
import supertest = require('supertest');
import { Server } from '../server';

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
    let server: Server;
    const API_URL = `${process.env.KARTOFFEL_URL || 'http://localhost:4000'}`;

    before(async function () {
        server = Server.bootstrap();
    });

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

    describe('#GET user', () => {
        it('Should return a user by id', (done) => {
            request(server.app)
                .get(`/api/users/${user_1.id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error: Error, res: request.Response) => {
                    expect(error).to.not.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id', user_1.id);
                    expect(res.body).to.have.property('firstName', user_1.firstName);
                    expect(res.body).to.have.property('lastName', user_1.lastName);
                    done();
                });
        });
    });

    describe('#GET user/domainUser', () => {
        it('Should return a user by domain-user id', (done) => {
            request(server.app)
                .get(`/api/users/domainUser/${user_1.primaryDomainUser.uniqueID}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error: Error, res: request.Response) => {
                    expect(error).to.not.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id', user_1.id);
                    expect(res.body).to.have.property('firstName', user_1.firstName);
                    expect(res.body).to.have.property('lastName', user_1.lastName);
                    done();
                });
        });
    });

    describe('#GET users', () => {
        it('Should return a user by id', (done) => {
            request(server.app)
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error: Error, res: request.Response) => {
                    expect(error).to.not.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(res).to.have.property('body');
                    expect(res.body).to.be.an('array');
                    const user = res.body[0];
                    expect(user).to.have.property('id', user_1.id);
                    expect(user).to.have.property('firstName', user_1.firstName);
                    expect(user).to.have.property('lastName', user_1.lastName);
                    done();
                });
        });
    });

    after(() => {
        nock.cleanAll();
    });
});
