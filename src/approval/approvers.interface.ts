export interface IApproverInfo {
    userId: string;
    isAdmin: boolean;
    isApprover: boolean;
    isBlocked: boolean;
    unit: {
        name: string;
        approvers: string[];
    };
}

export interface ICanApproveToUser {
    canApproveToUser: boolean;
    cantApproveReasons: cantApproveReasons[];
}

enum cantApproveReasons {
    'ApproverIsBlocked',
    'ApproverIsNotTheSameUnit',
    'ApproverCantApproveInHisUnit',
    'ApproverHasNoUnit',
    'UserHasNoUnit',
}
