import { Router } from 'express';
import { UsersController } from './users.contoller';
import { Wrapper } from '../utils/wrapper';

const UsersRouter: Router = Router();

UsersRouter.get('/', Wrapper.wrapAsync(UsersController.getAll)); // For tests only
UsersRouter.get('/:id', Wrapper.wrapAsync(UsersController.getByID));
UsersRouter.get('/domainUser/:domainUser', Wrapper.wrapAsync(UsersController.getByDomainUser));

export { UsersRouter };
