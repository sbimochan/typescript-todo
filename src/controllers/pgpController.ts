import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as pgpService from '../services/pgpService';

/**
 * Controller for handeling pgp keys generate request
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function generate(req: Request, res: Response, next: NextFunction): void {
  pgpService
    .generatePGPKeys()
    .then((data: {}) => res.status(HTTPStatus.OK).send({ data }))
    .catch((err: {}) => next(err));
}

/**
 * Controller for handeling encrypt request
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function encrypt(req: Request, res: Response, next: NextFunction): void {
  pgpService
    .encrypt(req.body.plainText)
    .then((data: {}) => res.status(HTTPStatus.OK).send({ data }))
    .catch((err: {}) => next(err));
}

/**
 * Controller for handeling decrypt request
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function decrypt(req: Request, res: Response, next: NextFunction): void {
  pgpService
    .decrypt(req.body.cipherText)
    .then((data: {}) => res.status(HTTPStatus.OK).send({ data }))
    .catch((err: {}) => next(err));
}

/**
 * Request for handeling request both request i.e. encrypt and decrypt
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function both(req: Request, res: Response, next: NextFunction): void {
  pgpService
    .all(req.body.plainText)
    .then((data: {}) => res.status(HTTPStatus.OK).send({ data }))
    .catch((err: {}) => next(err));
}
