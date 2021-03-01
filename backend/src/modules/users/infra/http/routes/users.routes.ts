import { Router } from 'express';

import ensureAuthorization from '@modules/users/infra/http/middlewares/ensureAuthorization';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/signUp',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.signUp,
);

usersRouter.post(
  '/',
  ensureAuthenticated,
  ensureAuthorization,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/:employeeId',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  usersController.update,
);

usersRouter.get('/', ensureAuthenticated, ensureAuthorization, usersController.index);

usersRouter.delete(
  '/:employeeId',
  ensureAuthenticated,
  ensureAuthorization,
  usersController.delete,
);

export default usersRouter;
