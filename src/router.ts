import { Router } from 'express';
import { UsersRouter } from './users/users.router';

const AppRouter: Router = Router();

AppRouter.use('/api/users', UsersRouter);

export { AppRouter };
