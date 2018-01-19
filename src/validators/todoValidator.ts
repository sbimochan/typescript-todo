import * as Joi from 'joi';
import validate from '../utils/validate';
import * as todoService from '../services/todoService';
import { Router, Request, Response, NextFunction } from 'express';

const SCHEMA = {
  description: Joi.string()
    .label('Description')
    .max(90)
    .required()
};

/**
 * Validate create/update todolist request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function todoValidator(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch((err:any) => next(err));
}

/**
 * Validate todo existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findTodo(req: Request, res: Response, next: NextFunction) {
  return todoService
    .getTodo(req.params.id)
    .then(() => next())
    .catch((err:any) => next(err));
}

export { findTodo, todoValidator };
