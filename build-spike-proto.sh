#!/usr/bin/env bash
mkdir -p proto/spike/generated 
cd proto/spike
curl -o spike.proto https://raw.githubusercontent.com/meateam/spike-service/master/proto/spike-service/spike.proto
cd ../../
npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./proto/spike/generated --grpc_out=./proto/spike/generated -I ./proto ./proto/spike/spike.proto
npx grpc_tools_node_protoc \
        --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
        --ts_out=./proto/spike/generated \
        -I ./proto \
        ./proto/spike/spike.proto