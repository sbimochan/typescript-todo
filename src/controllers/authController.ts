import * as HTTPStatus from 'http-status-codes';
import * as userService from '../services/userService';
import * as jwtGenerator from '../utils/jwt';
import * as loginService from '../services/loginService';
import { Request, Response, NextFunction } from 'express';

/**
 * Login user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */

export function login(req: Request, res: Response, next: NextFunction): void {
  loginService
    .findUser(req.body)
    .then((data: {}) => {
      loginService.saveSession(data);
      res.json(data);
    })
    .catch((err: {}) => next(err));
}

export function logout(req: Request, res: Response, next: NextFunction): void {
  const verified = jwtGenerator.verifyRefreshToken(req.token);
  const id = verified.userId;
  if (!id) {
    res.sendStatus(403);
  } else {
    loginService.deleteSession(verified);
    res.sendStatus(200);
  }
}

export function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const verified = jwtGenerator.verifyRefreshToken(req.token);
  const id = verified.userId;
  if (!id) {
    res.sendStatus(403);
  } else {
    let accessToken = jwtGenerator.generateAccessToken(id);
    res.json({ 'new access token': accessToken });
  }
}
