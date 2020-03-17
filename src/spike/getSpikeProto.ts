import { ProtoPullingError, FileError } from '../utils/errors';
import { githubOptions } from '../config';

const GithubContent = require('github-content');
const fs = require('fs');

function getSpikeProto() {
    const gc = new GithubContent(githubOptions);
    gc.file('proto/spike-service/spike.proto', function (err: Error, file: any) {
        if (err) throw new ProtoPullingError(`error with pulling the proto from github: ${err}`);
        fs.writeFile('proto/spike.proto', file.contents.toString(), function (err: Error) {
            if (err) throw new FileError(`error with creating the proto file: ${err}`);
        });
    });
}
