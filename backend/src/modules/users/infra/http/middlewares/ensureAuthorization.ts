import { Request, Response, NextFunction } from 'express';
import { AccessControl } from 'accesscontrol';

import grantsObject from '@config/permissions';
import AppError from '@shared/errors/AppError';

const accessControl = new AccessControl(grantsObject);

const urls = [
  { url: '/sessions', resource: 'Sessions' },
  { url: '/users', resource: 'Users' },
];

export default function ensureAuthorization(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const resource = urls.find(e => e.url === request.baseUrl)?.resource;

  if (!resource) {
    throw new AppError('Rota não encontrada.', 404);
  }

  if (request.method === 'POST') {
    if (accessControl.can(request.user.role).resource(resource).createAny().granted) {
      return next();
    }
  }

  if (request.method === 'GET') {
    if (accessControl.can(request.user.role).resource(resource).readAny().granted) {
      return next();
    }
  }

  if (request.method === 'UPDATE') {
    if (accessControl.can(request.user.role).resource(resource).updateAny().granted) {
      return next();
    }
  }

  if (request.method === 'DELETE') {
    if (accessControl.can(request.user.role).resource(resource).deleteAny().granted) {
      return next();
    }
  }

  throw new AppError('Você não possui acesso a esta rota', 403);
}
