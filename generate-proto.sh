#!/bin/sh

# Path to this plugin, Note this must be an abolsute path on Windows (see #15)
PROTOC_GEN_TS_PATH="../../node_modules/.bin/protoc-gen-ts"

read -p "Enter spike or users for proto generation: " protoName

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./generated/${protoName}"

PROTO_DIR="./proto/${protoName}"

cd "${PROTO_DIR}"

CURR_PATH=$(realpath .)

go clean -modcache
protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative "./${protoName}.proto"

mkdir -p "${OUT_DIR}"

grpc_tools_node_protoc \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --grpc_out="${OUT_DIR}" \
    "./${protoName}.proto"

grpc_tools_node_protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --ts_out="${OUT_DIR}" \
    "./${protoName}.proto"