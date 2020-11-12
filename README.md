# User-Service

Get user from the karttofel service

## Compile proto to go

In order to compile the proto file make sure you have `protobuf` and `protoc-gen-go`

### Installing protobuf on Linux

`./install_protoc.sh`

### Installing protoc-gen-go

`go get -u github.com/golang/protobuf/protoc-gen-go`

**Compiling Protobuf To Golang:**
`protoc -I proto/ proto/users/users.proto --go_out=plugins=grpc:./proto`

## Compile proto to js/ts

In order to compile the proto file make sure you have `grpc-tools`

**Compiling proto to js+ts:**
`npx grpc_tools_node_protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --ts_out=./proto/users/generated -I ./proto ./proto/users/users.proto`
`npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./proto/users/generated --grpc_out=./proto/users/generated -I ./proto ./proto/users/users.proto`

**Compiling spike proro to js+ts:**
`./build-spike-proto.sh`