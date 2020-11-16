import Axios, { AxiosResponse } from 'axios';
import { IApproverInfo, ICanApproveToUser } from './approvers.interface';
import { approvalUrl } from '../config';
import { ApprovalError, UserNotFoundError, ApplicationError } from '../utils/errors';

export class Approval {

    /**
     * Gets a user approver information from the approval service
     * @param id - the user ID
     */
    async getApproverInfo(id: string): Promise<IApproverInfo> {
        try {
            const res: AxiosResponse = await Axios.get(`${approvalUrl}/api/v1/users/${id}/approverInfo`);
            const info: IApproverInfo = res.data;

            return info;

        } catch (err) {
            if (err.response && err.response.status) {
                const status: number = err.response.status;
                if (status === 404) {
                    throw new UserNotFoundError(`The user with id ${id} is not found`);
                } else if (status === 502) {
                    throw new ApprovalError(`Error was thrown by the approval service : ${JSON.stringify(err)}`);
                }
                throw new ApprovalError(`Error in contacting the approval service : ${JSON.stringify(err)}`);
            } else {
                throw new ApplicationError(`Unknown Error while contacting the approval service : ${err}`);
            }
        }
    }

    /**
     * canApproveToUser checks if the user assign a good approver
     * @param approverID is the chosen approver id
     * @param userID is the user that's waiting to be approved
     */
    async canApproveToUser(approverID: string, userID: string) {
        try {
            const res: AxiosResponse = await Axios.get(`${approvalUrl}/api/v1/users/${approverID}/canApproveToUser/${userID}`);
            const info: ICanApproveToUser = res.data;

            return info;

        } catch (err) {
            if (err.response && err.response.status) {
                const status: number = err.response.status;
                if (status === 404) {
                    throw new UserNotFoundError('One of the users were not found');
                } else if (status === 502) {
                    throw new ApprovalError(`Error was thrown by the approval service : ${JSON.stringify(err)}`);
                }
                throw new ApprovalError(`Error in contacting the approval service : ${JSON.stringify(err)}`);
            } else {
                throw new ApplicationError(`Unknown Error while contacting the approval service : ${err}`);
            }
        }
    }
}
