const Axios = require('axios');
const shell = require('shelljs');
const fs = require('fs');

const githubBranch = process.env.GITHUB_BRANCH || 'master';

/**
 * this function is called before build and gets the proto file from the spike-service in github, and generate it to node and typescript.
 * @param {*} fileName - The name of the proto file
 * @param {*} protoPath - The path to the proto in github
 */
async function getSpikeProto(fileName, protoPath) {
    try {
        const proto = await Axios.get(`https://raw.githubusercontent.com/meateam/spike-service/${githubBranch}/proto/spike-service/${fileName}`);
        const file = await fs.promises.writeFile(`${protoPath}`, proto.data);
        shell.exec(`grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./protos/spike/generated --grpc_out=./protos/spike/generated -I ./protos ./${protoPath}`);
        shell.exec(`grpc_tools_node_protoc \
        --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
        --ts_out=./protos/spike/generated \
        -I ./protos \
        ./${protoPath}`);
    } catch (err) {
        throw new Error(`error with pulling the proto from github: ${err}`);
    }
}

getSpikeProto('spike.proto', 'protos/spike/spike.proto');
