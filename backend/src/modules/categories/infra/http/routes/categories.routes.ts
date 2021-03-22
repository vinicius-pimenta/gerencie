import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();
categoriesRouter.post(
  '/',
  ensureAuthenticated,

  categoriesController.create,
);

categoriesRouter.get('/', ensureAuthenticated, categoriesController.index);

export default categoriesRouter;
