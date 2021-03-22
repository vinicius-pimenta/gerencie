import { Router } from 'express';

import ensureAuthorization from '@modules/users/infra/http/middlewares/ensureAuthorization';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { celebrate, Joi, Segments } from 'celebrate';
import TasksController from '../controllers/TasksController';

const tasksRouter = Router();
const tasksController = new TasksController();
tasksRouter.post(
  '/',
  ensureAuthenticated,
  // ensureAuthorization,
  // celebrate({
  //   [Segments.BODY]: {
  //     title: Joi.string().required(),
  //     description: Joi.string(),
  //     userId: Joi.string().uuid(),
  //   },
  // }),
  tasksController.create,
);

tasksRouter.get('/', ensureAuthenticated, ensureAuthorization, tasksController.index);
tasksRouter.get('/:taskId', ensureAuthenticated, ensureAuthorization, tasksController.show);

tasksRouter.put(
  '/:taskId',

  tasksController.update,
);

tasksRouter.delete('/:taskId', ensureAuthenticated, ensureAuthorization, tasksController.delete);

export default tasksRouter;
