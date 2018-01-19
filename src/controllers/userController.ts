import * as Boom from 'boom';
import { Router, Request, Response, NextFunction } from 'express';

import * as HttpStatus from 'http-status-codes';
import * as jwtGenerator from '../utils/jwt';
import { findTodo } from '../validators/todoValidator';
import * as userService from '../services/userService';
import * as todoService from '../services/todoService';
import { findUser, userValidator } from '../validators/userValidator';

interface IRequest extends Request {
  token?: string;
}
/**
 * GET /api/users
 */
export function index(req: Request, res: Response, next: NextFunction): void {
  userService
    .getAllUsers()
    .then((data: {}) => res.json({ data }))
    .catch((err: any) => next(err));
}

/**
 * GET /api/users/:id
 */
export function show(req: Request, res: Response, next: NextFunction): void {
  userService
    .getUser(req.params.id)
    .then((data: {}) => res.json({ data }))
    .catch((err: any) => next(err));
}
/** show todos
 *
 */
//:id/todo
export function indexTodo(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const paginate = req.query.page;
  if (!req.query.search) {
    todoService
      .getUserTodos(req.params.id, paginate)
      .then((data: {}) => {
        res.json(data);
      })
      .catch((err: any) => next(err));
  } else {
    let searchTodo = req.query.search;

    return todoService
      .searchTodo(searchTodo, req.params.id)
      .then((data: {}) => res.json(data))
      .catch((err: any) => next(err));
  }
}

//:id/todo/:todoId
//add middleware userService.ensureToken
export function showTodo(
  req: IRequest,
  res: Response,
  next: NextFunction
): void {
  let verified = jwtGenerator.verifyAccessToken(String(req.token));
  if (!verified.userId) {
    res.sendStatus(403);
  } else {
    if (Number(req.params.id) === verified.userId) {
      todoService
        .getTodo(req.params.id)
        .then(data => res.json({ data: data, pagination: data.pagination }))
        .catch(
          err => next(err) // .then(data => res.json({ data: data, pagination: data.pagination }))
        );
    } else {
      throw Boom.forbidden('No no not allowed');
    }
  }
}
/**
 * POST /api/users
 */
///
export function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  userService
    .createUser(req.body)
    .then((data: {}) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err: any) => res.json('Duplicate email id'));
}
//:id/todo ensureToken

export function createTodo(
  req: IRequest,
  res: Response,
  next: NextFunction
): void {
  let verifiedId = jwtGenerator.verifyAccessToken(String(req.token));
  if (!verifiedId.userId) {
    res.sendStatus(403);
  } else {
    if (+req.params.id === verifiedId.userId) {
      todoService
        .createUserTodos(req.params.id, req.body)
        .then((data: {}) => res.status(HttpStatus.CREATED).json(data))
        .catch((err: any) => next(err));
    } else {
      throw Boom.forbidden('No no not allowed');
    }
  }
}

/**
 * PUT /api/users/:id
 */
//:id/todo/:todoId put midd:findTodo
export function changeTodo(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  todoService
    .updateTodo(req.params.todoId, req.body)
    .then((data: {}) => res.json({ data }))
    .catch((err: any) => next(err));
}

/* :id middle:findUser,userValidator */
export function changeUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  userService
    .updateUser(req.params.id, req.body)
    .then((data: {}) => res.json({ data }))
    .catch((err: any) => next(err));
}

/**
 * DELETE /api/users/:id
 */
/* delet4e,:id,findUser */
export function removeUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  userService
    .deleteUser(req.params.id)
    .then((data: {}) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err: any) => next(err));
}

/**
 * delete todo
 */
/* :id/todo/:todoId, findTodo */
export function removeTodo(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  todoService
    .deleteTodo(req.params.todoId)
    .then((data: {}) => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch((err: any) => next(err));
}
