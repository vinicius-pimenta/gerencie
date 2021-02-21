import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);

    request.user = user;

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
