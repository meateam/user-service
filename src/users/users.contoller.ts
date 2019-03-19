import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { UsersNotFoundError } from '../utils/errors/userErrors';

export class UsersController {
    static async getByID(req: Request, res: Response) {
        const user = await UsersService.getByID(req.params.id);
        if (!user) {
            throw new UsersNotFoundError();
        }

        res.json(user);
    }

    static async getByDomainUser(req: Request, res: Response) {
        const user = await UsersService.getByDomainUser(req.params.domainUser);
        if (!user) {
            throw new UsersNotFoundError();
        }

        res.json(user);
    }

    static async getAll(req: Request, res: Response) {
        res.json(await UsersService.getAll());
    }

}
