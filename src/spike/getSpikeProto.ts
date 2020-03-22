import { ProtoPullingError } from '../utils/errors';
import Axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';

const githubBranch = process.env.GITHUB_BRANCH || 'master';

/**
 * this function is called after build to get the proto file from the spike-service
 */
async function getSpikeProto() {
    try {
        const proto: AxiosResponse<string> = await Axios.get(`https://raw.githubusercontent.com/meateam/spike-service/${githubBranch}/proto/spike-service/spike.proto`);
        const file = await fs.promises.writeFile('protos/spike/spike.proto', proto.data);
    } catch (err) {
        throw new ProtoPullingError(`error with pulling the proto from github: ${err}`);
    }
}

getSpikeProto();
