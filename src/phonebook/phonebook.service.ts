import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IApproverInfo } from "./approvers.interface";
import { phonebookeUrl } from '../config';
import { PhonebookError, UserNotFoundError, ApplicationError } from '../utils/errors';

export class Phonebook {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create();
    }

    /**
     * Gets a user approver information from the phonebook 
     * @param id - the user ID
     */
    async getApproverInfo(id: string): Promise<IApproverInfo> {
        try {
            const res: AxiosResponse = await this.axiosInstance.get(`${phonebookeUrl}/api/v1/user/${id}/approverInfo`);
            const info: IApproverInfo = res.data;

            return info;
        } catch (err) {
            if (err.response && err.response.status) {
                const statusCode: number = err.response.status;
                if (statusCode === 404) {
                    throw new UserNotFoundError(`The user with id ${id} is not found`);
                }
                // Unauthorized
                if (statusCode === 401) {
                    throw new ApplicationError(`Request to phonebook wasn't authorized: ${JSON.stringify(err)} `);
                }
                throw new PhonebookError(`Error in contacting the user service : ${JSON.stringify(err)}`);
            } else {
                throw new ApplicationError(`Unknown Error while contacting the user service : ${JSON.stringify(err)}`);
            }
        }
    }
}
