import { Router } from 'express';

import ensureAuthorization from '@modules/users/infra/http/middlewares/ensureAuthorization';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import { Role } from '../../typeorm/entities/User';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string()
        .required()
        .valid(...Object.values(Role)),
    },
  }),
  usersController.create,
);

usersRouter.get('/', ensureAuthenticated, ensureAuthorization, usersController.index);

export default usersRouter;
