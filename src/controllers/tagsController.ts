import { Router, Request, Response, NextFunction } from 'express';
import * as tagsService from '../services/tagsService';

const router = Router();

export function index(req: Request, res: Response, next: NextFunction): void {
  tagsService
    .tags()
    .then((data: {}) => res.json({ data }))
    .catch((err: {}) => next(err));
}

export function show(req: Request, res: Response, next: NextFunction): void {
  tagsService
    .todosOfTags(req.params.id)
    .then((data: {}) => res.json({ data }))
    .catch((err: {}) => next(err));
}
