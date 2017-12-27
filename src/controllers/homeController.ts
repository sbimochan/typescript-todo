import { Request, Response, NextFunction } from 'express';

export const index = (
  request: Request,
  response: Response,
  next: NextFunction
) =>
  response.json({
    appName: 'typescript starter'
  });
