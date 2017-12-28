import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';

/**
 * Register user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export function register(req: Request, res: Response, next: NextFunction): void {
  userService
    .create(req.body)
    .then((result: {}) => res.status(HTTPStatus.CREATED).json(result))
    .catch((error: {}) => next(error));
}
