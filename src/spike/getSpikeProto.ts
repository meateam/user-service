import { ProtoPullingError } from '../utils/errors';
import Axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';

async function getSpikeProto() {
    try {
        const proto: AxiosResponse<string> = await Axios.get('https://raw.githubusercontent.com/meateam/spike-service/master/proto/spike-service/spike.proto');
        const file = await fs.promises.writeFile('proto/spike.proto', proto.data);
    } catch (err) {
        throw new ProtoPullingError(`error with pulling the proto from github: ${err}`);
    }
}

getSpikeProto();
