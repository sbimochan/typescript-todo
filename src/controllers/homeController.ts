import config from '../config/config';
import { Request, Response } from 'express';
import * as homeService from '../services/homeService';

export function index(req: Request, res: Response): void {
  const result = homeService.getAppInfo();
  res.json(result);
}
