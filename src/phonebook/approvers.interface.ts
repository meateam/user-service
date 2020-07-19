export interface IApproverInfo {
    id: string;
    isAdmin: boolean;
    canApproveForHisUnit: boolean;
    isAdditionalApprover: boolean;
    canApprove: boolean;
    unit: {
        _id: string;
        id: string;
        approvers: string[];
        specialApprovers: string[];
        name: string;
    }
}

export interface IFormatedApproverInfo {
    canApprove: boolean,
    unit: {
        approvers: string[],
        name: string,
    }
}
