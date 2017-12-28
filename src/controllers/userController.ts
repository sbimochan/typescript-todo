import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';

export function index(req: Request, res: Response, next: NextFunction) {
  return userService
    .paginate(req.query.page)
    .then((data: {}) => res.status(HTTPStatus.OK).json(data))
    .catch((error: {}) => next(error));
}
