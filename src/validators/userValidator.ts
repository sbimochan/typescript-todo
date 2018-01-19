import * as Joi from 'joi';
import validate from '../utils/validate';
import * as userService from '../services/userService';
import { Router, Request, Response, NextFunction } from 'express';

const SCHEMA = {
  first_name: Joi.string()
    .label('first name')
    .max(90)
    .required(),
  last_name: Joi.string()
    .label('Last name')
    .max(90)
    .required(),
  email: Joi.string()
    .email()
    .label('email')
    .max(90)
    .required(),
  username: Joi.string()
    .min(3)
    .max(30)
    .alphanum()
    .required(),
  password: Joi.string()
    .min(3)
    .alphanum()
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
export function userValidator(req: Request, res: Response, next: NextFunction) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch((err:any) => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
export function findUser(req: Request, res: Response, next: NextFunction) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch((err:any) => next(err));
}

