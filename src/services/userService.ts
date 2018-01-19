import * as Boom from 'boom';
import User from '../models/user';
import { Router, Request, Response, NextFunction } from 'express';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id: number) {
  return new User({ id }).fetch().then((user: {}) => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(user: {}) {
  return new User({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    username: user.username,
    password: user.password
  })
    .save()
    .then(user => user.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id: number, user: {}) {
  return new User({ id })
    .save({ name: user.name })
    .then(user => user.refresh());
}
/**
 * jwt ensure
 */
export function ensureToken(req: Request, res: Response, next: NextFunction) {
  console.log('header', req.headers['authorization']);
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id:number) {
  return new User({ id }).fetch().then(user => user.destroy());
}
