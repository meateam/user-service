// import { describe } from 'mocha';
import { renewKartoffelToken } from '../rpc.server';

describe.only('Spike and Kartoffel Integration', () => {
    describe('Token creation', () => {
        it('should create a token', async () => {
            const token = await renewKartoffelToken();
        });
        it('should save the token in redis', async () => {
            
        });
    });
});
