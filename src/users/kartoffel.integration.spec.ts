import { describe } from 'mocha';
import Spike from '../spike/spike.service';
import * as redis from 'redis';

describe.only('Spike and Kartoffel Integration', () => {

    let redisClient:redis.RedisClient;
    let SpikeService: Spike;

    before(async () => {
        redisClient = redis.createClient();
        SpikeService = new Spike(redisClient);
    });

    describe('Token creation', () => {
        it('should save the token in redis', async () => {
            const token = await SpikeService.getToken();
            console.log(token);
        });
    });
});
