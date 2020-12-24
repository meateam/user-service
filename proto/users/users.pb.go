// Code generated by protoc-gen-go. DO NOT EDIT.
// source: users/users.proto

package users

import (
	context "context"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type GetByMailRequest struct {
	Mail                 string   `protobuf:"bytes,1,opt,name=mail,proto3" json:"mail,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetByMailRequest) Reset()         { *m = GetByMailRequest{} }
func (m *GetByMailRequest) String() string { return proto.CompactTextString(m) }
func (*GetByMailRequest) ProtoMessage()    {}
func (*GetByMailRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{0}
}

func (m *GetByMailRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetByMailRequest.Unmarshal(m, b)
}
func (m *GetByMailRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetByMailRequest.Marshal(b, m, deterministic)
}
func (m *GetByMailRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetByMailRequest.Merge(m, src)
}
func (m *GetByMailRequest) XXX_Size() int {
	return xxx_messageInfo_GetByMailRequest.Size(m)
}
func (m *GetByMailRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GetByMailRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GetByMailRequest proto.InternalMessageInfo

func (m *GetByMailRequest) GetMail() string {
	if m != nil {
		return m.Mail
	}
	return ""
}

type GetByIDRequest struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetByIDRequest) Reset()         { *m = GetByIDRequest{} }
func (m *GetByIDRequest) String() string { return proto.CompactTextString(m) }
func (*GetByIDRequest) ProtoMessage()    {}
func (*GetByIDRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{1}
}

func (m *GetByIDRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetByIDRequest.Unmarshal(m, b)
}
func (m *GetByIDRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetByIDRequest.Marshal(b, m, deterministic)
}
func (m *GetByIDRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetByIDRequest.Merge(m, src)
}
func (m *GetByIDRequest) XXX_Size() int {
	return xxx_messageInfo_GetByIDRequest.Size(m)
}
func (m *GetByIDRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GetByIDRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GetByIDRequest proto.InternalMessageInfo

func (m *GetByIDRequest) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

type User struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Mail                 string   `protobuf:"bytes,2,opt,name=mail,proto3" json:"mail,omitempty"`
	FirstName            string   `protobuf:"bytes,3,opt,name=firstName,proto3" json:"firstName,omitempty"`
	LastName             string   `protobuf:"bytes,4,opt,name=lastName,proto3" json:"lastName,omitempty"`
	FullName             string   `protobuf:"bytes,5,opt,name=fullName,proto3" json:"fullName,omitempty"`
	Hierarchy            []string `protobuf:"bytes,6,rep,name=hierarchy,proto3" json:"hierarchy,omitempty"`
	HierarchyFlat        string   `protobuf:"bytes,7,opt,name=hierarchyFlat,proto3" json:"hierarchyFlat,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *User) Reset()         { *m = User{} }
func (m *User) String() string { return proto.CompactTextString(m) }
func (*User) ProtoMessage()    {}
func (*User) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{2}
}

func (m *User) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_User.Unmarshal(m, b)
}
func (m *User) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_User.Marshal(b, m, deterministic)
}
func (m *User) XXX_Merge(src proto.Message) {
	xxx_messageInfo_User.Merge(m, src)
}
func (m *User) XXX_Size() int {
	return xxx_messageInfo_User.Size(m)
}
func (m *User) XXX_DiscardUnknown() {
	xxx_messageInfo_User.DiscardUnknown(m)
}

var xxx_messageInfo_User proto.InternalMessageInfo

func (m *User) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *User) GetMail() string {
	if m != nil {
		return m.Mail
	}
	return ""
}

func (m *User) GetFirstName() string {
	if m != nil {
		return m.FirstName
	}
	return ""
}

func (m *User) GetLastName() string {
	if m != nil {
		return m.LastName
	}
	return ""
}

func (m *User) GetFullName() string {
	if m != nil {
		return m.FullName
	}
	return ""
}

func (m *User) GetHierarchy() []string {
	if m != nil {
		return m.Hierarchy
	}
	return nil
}

func (m *User) GetHierarchyFlat() string {
	if m != nil {
		return m.HierarchyFlat
	}
	return ""
}

type Unit struct {
	Name                 string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Approvers            []string `protobuf:"bytes,2,rep,name=approvers,proto3" json:"approvers,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Unit) Reset()         { *m = Unit{} }
func (m *Unit) String() string { return proto.CompactTextString(m) }
func (*Unit) ProtoMessage()    {}
func (*Unit) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{3}
}

func (m *Unit) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Unit.Unmarshal(m, b)
}
func (m *Unit) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Unit.Marshal(b, m, deterministic)
}
func (m *Unit) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Unit.Merge(m, src)
}
func (m *Unit) XXX_Size() int {
	return xxx_messageInfo_Unit.Size(m)
}
func (m *Unit) XXX_DiscardUnknown() {
	xxx_messageInfo_Unit.DiscardUnknown(m)
}

var xxx_messageInfo_Unit proto.InternalMessageInfo

func (m *Unit) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Unit) GetApprovers() []string {
	if m != nil {
		return m.Approvers
	}
	return nil
}

type ApproverInfo struct {
	UserId               string   `protobuf:"bytes,1,opt,name=userId,proto3" json:"userId,omitempty"`
	IsAdmin              bool     `protobuf:"varint,2,opt,name=isAdmin,proto3" json:"isAdmin,omitempty"`
	IsApprover           bool     `protobuf:"varint,3,opt,name=isApprover,proto3" json:"isApprover,omitempty"`
	IsBlocked            bool     `protobuf:"varint,4,opt,name=isBlocked,proto3" json:"isBlocked,omitempty"`
	Unit                 *Unit    `protobuf:"bytes,5,opt,name=unit,proto3" json:"unit,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ApproverInfo) Reset()         { *m = ApproverInfo{} }
func (m *ApproverInfo) String() string { return proto.CompactTextString(m) }
func (*ApproverInfo) ProtoMessage()    {}
func (*ApproverInfo) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{4}
}

func (m *ApproverInfo) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ApproverInfo.Unmarshal(m, b)
}
func (m *ApproverInfo) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ApproverInfo.Marshal(b, m, deterministic)
}
func (m *ApproverInfo) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ApproverInfo.Merge(m, src)
}
func (m *ApproverInfo) XXX_Size() int {
	return xxx_messageInfo_ApproverInfo.Size(m)
}
func (m *ApproverInfo) XXX_DiscardUnknown() {
	xxx_messageInfo_ApproverInfo.DiscardUnknown(m)
}

var xxx_messageInfo_ApproverInfo proto.InternalMessageInfo

func (m *ApproverInfo) GetUserId() string {
	if m != nil {
		return m.UserId
	}
	return ""
}

func (m *ApproverInfo) GetIsAdmin() bool {
	if m != nil {
		return m.IsAdmin
	}
	return false
}

func (m *ApproverInfo) GetIsApprover() bool {
	if m != nil {
		return m.IsApprover
	}
	return false
}

func (m *ApproverInfo) GetIsBlocked() bool {
	if m != nil {
		return m.IsBlocked
	}
	return false
}

func (m *ApproverInfo) GetUnit() *Unit {
	if m != nil {
		return m.Unit
	}
	return nil
}

type GetUserResponse struct {
	User                 *User    `protobuf:"bytes,1,opt,name=user,proto3" json:"user,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetUserResponse) Reset()         { *m = GetUserResponse{} }
func (m *GetUserResponse) String() string { return proto.CompactTextString(m) }
func (*GetUserResponse) ProtoMessage()    {}
func (*GetUserResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{5}
}

func (m *GetUserResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetUserResponse.Unmarshal(m, b)
}
func (m *GetUserResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetUserResponse.Marshal(b, m, deterministic)
}
func (m *GetUserResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetUserResponse.Merge(m, src)
}
func (m *GetUserResponse) XXX_Size() int {
	return xxx_messageInfo_GetUserResponse.Size(m)
}
func (m *GetUserResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_GetUserResponse.DiscardUnknown(m)
}

var xxx_messageInfo_GetUserResponse proto.InternalMessageInfo

func (m *GetUserResponse) GetUser() *User {
	if m != nil {
		return m.User
	}
	return nil
}

type FindUserByNameRequest struct {
	Name                 string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *FindUserByNameRequest) Reset()         { *m = FindUserByNameRequest{} }
func (m *FindUserByNameRequest) String() string { return proto.CompactTextString(m) }
func (*FindUserByNameRequest) ProtoMessage()    {}
func (*FindUserByNameRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{6}
}

func (m *FindUserByNameRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_FindUserByNameRequest.Unmarshal(m, b)
}
func (m *FindUserByNameRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_FindUserByNameRequest.Marshal(b, m, deterministic)
}
func (m *FindUserByNameRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_FindUserByNameRequest.Merge(m, src)
}
func (m *FindUserByNameRequest) XXX_Size() int {
	return xxx_messageInfo_FindUserByNameRequest.Size(m)
}
func (m *FindUserByNameRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_FindUserByNameRequest.DiscardUnknown(m)
}

var xxx_messageInfo_FindUserByNameRequest proto.InternalMessageInfo

func (m *FindUserByNameRequest) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

type FindUserByNameResponse struct {
	Users                []*User  `protobuf:"bytes,1,rep,name=users,proto3" json:"users,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *FindUserByNameResponse) Reset()         { *m = FindUserByNameResponse{} }
func (m *FindUserByNameResponse) String() string { return proto.CompactTextString(m) }
func (*FindUserByNameResponse) ProtoMessage()    {}
func (*FindUserByNameResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{7}
}

func (m *FindUserByNameResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_FindUserByNameResponse.Unmarshal(m, b)
}
func (m *FindUserByNameResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_FindUserByNameResponse.Marshal(b, m, deterministic)
}
func (m *FindUserByNameResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_FindUserByNameResponse.Merge(m, src)
}
func (m *FindUserByNameResponse) XXX_Size() int {
	return xxx_messageInfo_FindUserByNameResponse.Size(m)
}
func (m *FindUserByNameResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_FindUserByNameResponse.DiscardUnknown(m)
}

var xxx_messageInfo_FindUserByNameResponse proto.InternalMessageInfo

func (m *FindUserByNameResponse) GetUsers() []*User {
	if m != nil {
		return m.Users
	}
	return nil
}

type GetApproverInfoRequest struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetApproverInfoRequest) Reset()         { *m = GetApproverInfoRequest{} }
func (m *GetApproverInfoRequest) String() string { return proto.CompactTextString(m) }
func (*GetApproverInfoRequest) ProtoMessage()    {}
func (*GetApproverInfoRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{8}
}

func (m *GetApproverInfoRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetApproverInfoRequest.Unmarshal(m, b)
}
func (m *GetApproverInfoRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetApproverInfoRequest.Marshal(b, m, deterministic)
}
func (m *GetApproverInfoRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetApproverInfoRequest.Merge(m, src)
}
func (m *GetApproverInfoRequest) XXX_Size() int {
	return xxx_messageInfo_GetApproverInfoRequest.Size(m)
}
func (m *GetApproverInfoRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GetApproverInfoRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GetApproverInfoRequest proto.InternalMessageInfo

func (m *GetApproverInfoRequest) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

type GetApproverInfoResponse struct {
	ApproverInfo         *ApproverInfo `protobuf:"bytes,1,opt,name=approverInfo,proto3" json:"approverInfo,omitempty"`
	XXX_NoUnkeyedLiteral struct{}      `json:"-"`
	XXX_unrecognized     []byte        `json:"-"`
	XXX_sizecache        int32         `json:"-"`
}

func (m *GetApproverInfoResponse) Reset()         { *m = GetApproverInfoResponse{} }
func (m *GetApproverInfoResponse) String() string { return proto.CompactTextString(m) }
func (*GetApproverInfoResponse) ProtoMessage()    {}
func (*GetApproverInfoResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{9}
}

func (m *GetApproverInfoResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetApproverInfoResponse.Unmarshal(m, b)
}
func (m *GetApproverInfoResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetApproverInfoResponse.Marshal(b, m, deterministic)
}
func (m *GetApproverInfoResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetApproverInfoResponse.Merge(m, src)
}
func (m *GetApproverInfoResponse) XXX_Size() int {
	return xxx_messageInfo_GetApproverInfoResponse.Size(m)
}
func (m *GetApproverInfoResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_GetApproverInfoResponse.DiscardUnknown(m)
}

var xxx_messageInfo_GetApproverInfoResponse proto.InternalMessageInfo

func (m *GetApproverInfoResponse) GetApproverInfo() *ApproverInfo {
	if m != nil {
		return m.ApproverInfo
	}
	return nil
}

type CanApproveToUserRequest struct {
	ApproverID           string   `protobuf:"bytes,1,opt,name=approverID,proto3" json:"approverID,omitempty"`
	UserID               string   `protobuf:"bytes,2,opt,name=userID,proto3" json:"userID,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *CanApproveToUserRequest) Reset()         { *m = CanApproveToUserRequest{} }
func (m *CanApproveToUserRequest) String() string { return proto.CompactTextString(m) }
func (*CanApproveToUserRequest) ProtoMessage()    {}
func (*CanApproveToUserRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{10}
}

func (m *CanApproveToUserRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_CanApproveToUserRequest.Unmarshal(m, b)
}
func (m *CanApproveToUserRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_CanApproveToUserRequest.Marshal(b, m, deterministic)
}
func (m *CanApproveToUserRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_CanApproveToUserRequest.Merge(m, src)
}
func (m *CanApproveToUserRequest) XXX_Size() int {
	return xxx_messageInfo_CanApproveToUserRequest.Size(m)
}
func (m *CanApproveToUserRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_CanApproveToUserRequest.DiscardUnknown(m)
}

var xxx_messageInfo_CanApproveToUserRequest proto.InternalMessageInfo

func (m *CanApproveToUserRequest) GetApproverID() string {
	if m != nil {
		return m.ApproverID
	}
	return ""
}

func (m *CanApproveToUserRequest) GetUserID() string {
	if m != nil {
		return m.UserID
	}
	return ""
}

type CanApproveToUserResponse struct {
	CanApproveToUser     bool     `protobuf:"varint,1,opt,name=canApproveToUser,proto3" json:"canApproveToUser,omitempty"`
	CantApproveReasons   []string `protobuf:"bytes,2,rep,name=cantApproveReasons,proto3" json:"cantApproveReasons,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *CanApproveToUserResponse) Reset()         { *m = CanApproveToUserResponse{} }
func (m *CanApproveToUserResponse) String() string { return proto.CompactTextString(m) }
func (*CanApproveToUserResponse) ProtoMessage()    {}
func (*CanApproveToUserResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_b48c37af7f888781, []int{11}
}

func (m *CanApproveToUserResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_CanApproveToUserResponse.Unmarshal(m, b)
}
func (m *CanApproveToUserResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_CanApproveToUserResponse.Marshal(b, m, deterministic)
}
func (m *CanApproveToUserResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_CanApproveToUserResponse.Merge(m, src)
}
func (m *CanApproveToUserResponse) XXX_Size() int {
	return xxx_messageInfo_CanApproveToUserResponse.Size(m)
}
func (m *CanApproveToUserResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_CanApproveToUserResponse.DiscardUnknown(m)
}

var xxx_messageInfo_CanApproveToUserResponse proto.InternalMessageInfo

func (m *CanApproveToUserResponse) GetCanApproveToUser() bool {
	if m != nil {
		return m.CanApproveToUser
	}
	return false
}

func (m *CanApproveToUserResponse) GetCantApproveReasons() []string {
	if m != nil {
		return m.CantApproveReasons
	}
	return nil
}

func init() {
	proto.RegisterType((*GetByMailRequest)(nil), "users.GetByMailRequest")
	proto.RegisterType((*GetByIDRequest)(nil), "users.GetByIDRequest")
	proto.RegisterType((*User)(nil), "users.User")
	proto.RegisterType((*Unit)(nil), "users.Unit")
	proto.RegisterType((*ApproverInfo)(nil), "users.ApproverInfo")
	proto.RegisterType((*GetUserResponse)(nil), "users.GetUserResponse")
	proto.RegisterType((*FindUserByNameRequest)(nil), "users.FindUserByNameRequest")
	proto.RegisterType((*FindUserByNameResponse)(nil), "users.FindUserByNameResponse")
	proto.RegisterType((*GetApproverInfoRequest)(nil), "users.GetApproverInfoRequest")
	proto.RegisterType((*GetApproverInfoResponse)(nil), "users.GetApproverInfoResponse")
	proto.RegisterType((*CanApproveToUserRequest)(nil), "users.CanApproveToUserRequest")
	proto.RegisterType((*CanApproveToUserResponse)(nil), "users.CanApproveToUserResponse")
}

func init() {
	proto.RegisterFile("users/users.proto", fileDescriptor_b48c37af7f888781)
}

var fileDescriptor_b48c37af7f888781 = []byte{
	// 560 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x09, 0x6e, 0x88, 0x02, 0xff, 0x7c, 0x54, 0xef, 0x6e, 0x12, 0x41,
	0x10, 0x97, 0x42, 0x29, 0x1d, 0x5a, 0xc4, 0x35, 0x85, 0x0b, 0xe9, 0x1f, 0xdc, 0x18, 0xd3, 0x68,
	0x82, 0x09, 0x7e, 0xd0, 0xc4, 0xc4, 0xa4, 0x48, 0x6a, 0xf8, 0xa0, 0xc6, 0x8d, 0x7d, 0x80, 0x13,
	0x96, 0xf4, 0xe2, 0x71, 0x87, 0xb7, 0x47, 0x13, 0x9e, 0xc0, 0xc7, 0xf0, 0x65, 0x7c, 0x30, 0x77,
	0xe7, 0xe6, 0xf6, 0xfe, 0xc0, 0xf9, 0x85, 0xdc, 0xcc, 0x6f, 0xe6, 0x37, 0x33, 0xbf, 0x99, 0x05,
	0x9e, 0x6c, 0x94, 0x8c, 0xd4, 0x6b, 0xfc, 0x1d, 0xad, 0xa3, 0x30, 0x0e, 0xd9, 0x21, 0x1a, 0xfc,
	0x05, 0x74, 0x3f, 0xc9, 0x78, 0xb2, 0xfd, 0xec, 0x7a, 0xbe, 0x90, 0xbf, 0x36, 0x52, 0xc5, 0x8c,
	0x41, 0x63, 0xa5, 0x4d, 0xa7, 0x36, 0xac, 0x5d, 0x1f, 0x0b, 0xfc, 0xe6, 0x43, 0xe8, 0x60, 0xdc,
	0x6c, 0x9a, 0x46, 0x75, 0xe0, 0xc0, 0x5b, 0x50, 0x8c, 0xfe, 0xe2, 0x7f, 0x6b, 0xd0, 0xb8, 0xd3,
	0x9c, 0x65, 0xc0, 0xd2, 0x1d, 0x64, 0x74, 0xec, 0x1c, 0x8e, 0x97, 0x5e, 0xa4, 0xe2, 0x2f, 0xee,
	0x4a, 0x3a, 0x75, 0x04, 0x32, 0x07, 0x1b, 0x40, 0xcb, 0x77, 0x09, 0x6c, 0x20, 0x68, 0x6d, 0x83,
	0x2d, 0x37, 0xbe, 0x8f, 0xd8, 0x61, 0x82, 0xa5, 0xb6, 0x61, 0xbd, 0xf7, 0x64, 0xe4, 0x46, 0xf3,
	0xfb, 0xad, 0xd3, 0x1c, 0xd6, 0x0d, 0xab, 0x75, 0xb0, 0xe7, 0x70, 0x6a, 0x8d, 0x5b, 0xdf, 0x8d,
	0x9d, 0x23, 0x4c, 0x2f, 0x3a, 0xf9, 0x3b, 0x3d, 0x45, 0xe0, 0xa1, 0x08, 0x81, 0xa9, 0x41, 0x22,
	0x04, 0xc4, 0xef, 0xae, 0xb5, 0x7c, 0x0f, 0x5a, 0x39, 0x3d, 0x0e, 0xf2, 0x5b, 0x07, 0xff, 0x53,
	0x83, 0x93, 0x1b, 0xb2, 0x66, 0xc1, 0x32, 0x64, 0x3d, 0x68, 0x1a, 0x91, 0x67, 0xa9, 0x18, 0x64,
	0x31, 0x07, 0x8e, 0x3c, 0x75, 0xb3, 0x58, 0x79, 0x01, 0x6a, 0xd2, 0x12, 0xa9, 0xc9, 0x2e, 0x01,
	0xf4, 0x27, 0x71, 0xa0, 0x2e, 0x2d, 0x91, 0xf3, 0x98, 0x06, 0x3c, 0x35, 0xf1, 0xc3, 0xf9, 0x4f,
	0xb9, 0x40, 0x65, 0x5a, 0x22, 0x73, 0xb0, 0x2b, 0x68, 0x6c, 0x74, 0xeb, 0x28, 0x4b, 0x7b, 0xdc,
	0x1e, 0x25, 0xeb, 0x36, 0xd3, 0x08, 0x04, 0xf8, 0x18, 0x1e, 0xeb, 0x25, 0x9a, 0x25, 0x09, 0xa9,
	0xd6, 0x61, 0xa0, 0x24, 0xe6, 0x68, 0x1b, 0x3b, 0xcc, 0xe5, 0x98, 0x10, 0x04, 0xf8, 0x2b, 0x38,
	0xbb, 0xf5, 0x82, 0x85, 0xf1, 0x4c, 0xb6, 0x46, 0xe5, 0xdc, 0x95, 0x94, 0x05, 0xe2, 0xef, 0xa1,
	0x57, 0x0e, 0xa6, 0x3a, 0xcf, 0x20, 0x39, 0x38, 0x1d, 0x5e, 0x2f, 0x17, 0xa2, 0x53, 0xbc, 0x86,
	0x9e, 0xee, 0x2e, 0xaf, 0x60, 0xd5, 0xa9, 0x09, 0xe8, 0xef, 0x44, 0x52, 0x9d, 0xb7, 0x70, 0xe2,
	0xe6, 0xfc, 0x34, 0xd7, 0x53, 0x2a, 0x57, 0x48, 0x29, 0x04, 0xf2, 0x6f, 0xd0, 0xff, 0xe8, 0x06,
	0x14, 0xf0, 0x3d, 0x4c, 0x44, 0x4a, 0xca, 0xeb, 0xad, 0xd8, 0xd0, 0x29, 0xb5, 0x91, 0xf3, 0xd8,
	0x3d, 0x4f, 0xe9, 0xc4, 0xc9, 0xe2, 0x0f, 0xe0, 0xec, 0x52, 0x52, 0x9f, 0x2f, 0xa1, 0x3b, 0x2f,
	0x61, 0xc8, 0xdc, 0x12, 0x3b, 0x7e, 0x36, 0x02, 0xa6, 0x7d, 0xe9, 0xbc, 0x42, 0xba, 0x4a, 0x53,
	0xd0, 0xfd, 0xed, 0x41, 0xc6, 0xbf, 0xeb, 0x70, 0x68, 0x12, 0x15, 0x9b, 0xc0, 0x29, 0x2d, 0x3c,
	0x79, 0xe1, 0xac, 0x4f, 0x42, 0x94, 0xdf, 0xfc, 0xa0, 0x97, 0x01, 0xf9, 0x3e, 0xf9, 0x23, 0xf6,
	0x01, 0xda, 0x96, 0x43, 0x0f, 0x7b, 0x96, 0x67, 0xb0, 0xff, 0x06, 0xff, 0xc9, 0xff, 0x0a, 0x9d,
	0xe2, 0x4d, 0xb0, 0x73, 0x8a, 0xdd, 0x7b, 0x57, 0x83, 0x8b, 0x0a, 0xd4, 0x12, 0x0a, 0xbc, 0xe2,
	0xc2, 0x4b, 0xbb, 0xc8, 0xaa, 0xef, 0xb9, 0x9f, 0xc1, 0x65, 0x15, 0x6c, 0x39, 0xef, 0xa0, 0x5b,
	0x5e, 0x15, 0x4b, 0xb3, 0x2a, 0xce, 0x62, 0x70, 0x55, 0x89, 0xa7, 0xb4, 0x3f, 0x9a, 0xf8, 0x5f,
	0xfb, 0xe6, 0x5f, 0x00, 0x00, 0x00, 0xff, 0xff, 0x60, 0x6f, 0x83, 0x9b, 0x80, 0x05, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// UsersClient is the client API for Users service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type UsersClient interface {
	GetUserByMail(ctx context.Context, in *GetByMailRequest, opts ...grpc.CallOption) (*GetUserResponse, error)
	GetUserByID(ctx context.Context, in *GetByIDRequest, opts ...grpc.CallOption) (*GetUserResponse, error)
	FindUserByName(ctx context.Context, in *FindUserByNameRequest, opts ...grpc.CallOption) (*FindUserByNameResponse, error)
	GetApproverInfo(ctx context.Context, in *GetApproverInfoRequest, opts ...grpc.CallOption) (*GetApproverInfoResponse, error)
	CanApproveToUser(ctx context.Context, in *CanApproveToUserRequest, opts ...grpc.CallOption) (*CanApproveToUserResponse, error)
}

type usersClient struct {
	cc grpc.ClientConnInterface
}

func NewUsersClient(cc grpc.ClientConnInterface) UsersClient {
	return &usersClient{cc}
}

func (c *usersClient) GetUserByMail(ctx context.Context, in *GetByMailRequest, opts ...grpc.CallOption) (*GetUserResponse, error) {
	out := new(GetUserResponse)
	err := c.cc.Invoke(ctx, "/users.Users/GetUserByMail", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersClient) GetUserByID(ctx context.Context, in *GetByIDRequest, opts ...grpc.CallOption) (*GetUserResponse, error) {
	out := new(GetUserResponse)
	err := c.cc.Invoke(ctx, "/users.Users/GetUserByID", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersClient) FindUserByName(ctx context.Context, in *FindUserByNameRequest, opts ...grpc.CallOption) (*FindUserByNameResponse, error) {
	out := new(FindUserByNameResponse)
	err := c.cc.Invoke(ctx, "/users.Users/FindUserByName", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersClient) GetApproverInfo(ctx context.Context, in *GetApproverInfoRequest, opts ...grpc.CallOption) (*GetApproverInfoResponse, error) {
	out := new(GetApproverInfoResponse)
	err := c.cc.Invoke(ctx, "/users.Users/GetApproverInfo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersClient) CanApproveToUser(ctx context.Context, in *CanApproveToUserRequest, opts ...grpc.CallOption) (*CanApproveToUserResponse, error) {
	out := new(CanApproveToUserResponse)
	err := c.cc.Invoke(ctx, "/users.Users/CanApproveToUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// UsersServer is the server API for Users service.
type UsersServer interface {
	GetUserByMail(context.Context, *GetByMailRequest) (*GetUserResponse, error)
	GetUserByID(context.Context, *GetByIDRequest) (*GetUserResponse, error)
	FindUserByName(context.Context, *FindUserByNameRequest) (*FindUserByNameResponse, error)
	GetApproverInfo(context.Context, *GetApproverInfoRequest) (*GetApproverInfoResponse, error)
	CanApproveToUser(context.Context, *CanApproveToUserRequest) (*CanApproveToUserResponse, error)
}

// UnimplementedUsersServer can be embedded to have forward compatible implementations.
type UnimplementedUsersServer struct {
}

func (*UnimplementedUsersServer) GetUserByMail(ctx context.Context, req *GetByMailRequest) (*GetUserResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUserByMail not implemented")
}
func (*UnimplementedUsersServer) GetUserByID(ctx context.Context, req *GetByIDRequest) (*GetUserResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetUserByID not implemented")
}
func (*UnimplementedUsersServer) FindUserByName(ctx context.Context, req *FindUserByNameRequest) (*FindUserByNameResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FindUserByName not implemented")
}
func (*UnimplementedUsersServer) GetApproverInfo(ctx context.Context, req *GetApproverInfoRequest) (*GetApproverInfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetApproverInfo not implemented")
}
func (*UnimplementedUsersServer) CanApproveToUser(ctx context.Context, req *CanApproveToUserRequest) (*CanApproveToUserResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CanApproveToUser not implemented")
}

func RegisterUsersServer(s *grpc.Server, srv UsersServer) {
	s.RegisterService(&_Users_serviceDesc, srv)
}

func _Users_GetUserByMail_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetByMailRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).GetUserByMail(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/users.Users/GetUserByMail",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).GetUserByMail(ctx, req.(*GetByMailRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Users_GetUserByID_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetByIDRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).GetUserByID(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/users.Users/GetUserByID",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).GetUserByID(ctx, req.(*GetByIDRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Users_FindUserByName_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindUserByNameRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).FindUserByName(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/users.Users/FindUserByName",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).FindUserByName(ctx, req.(*FindUserByNameRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Users_GetApproverInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetApproverInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).GetApproverInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/users.Users/GetApproverInfo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).GetApproverInfo(ctx, req.(*GetApproverInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Users_CanApproveToUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CanApproveToUserRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).CanApproveToUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/users.Users/CanApproveToUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).CanApproveToUser(ctx, req.(*CanApproveToUserRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Users_serviceDesc = grpc.ServiceDesc{
	ServiceName: "users.Users",
	HandlerType: (*UsersServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetUserByMail",
			Handler:    _Users_GetUserByMail_Handler,
		},
		{
			MethodName: "GetUserByID",
			Handler:    _Users_GetUserByID_Handler,
		},
		{
			MethodName: "FindUserByName",
			Handler:    _Users_FindUserByName_Handler,
		},
		{
			MethodName: "GetApproverInfo",
			Handler:    _Users_GetApproverInfo_Handler,
		},
		{
			MethodName: "CanApproveToUser",
			Handler:    _Users_CanApproveToUser_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "users/users.proto",
}
