import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import taskRouter from '@modules/tasks/infra/http/routes/tasks.routes';
import categoryRouter from '@modules/categories/infra/http/routes/categories.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/tasks', taskRouter);
routes.use('/categories', categoryRouter);

export default routes;
