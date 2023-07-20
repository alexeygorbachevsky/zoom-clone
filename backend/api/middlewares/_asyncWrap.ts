import { Request, Response, NextFunction, RequestHandler } from "express";

type Fn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncWrap =
  (fn: Fn): RequestHandler =>
  (req, res, next, ...args) => {
    const fnReturn = fn(req, res, next, ...args);

    return Promise.resolve(fnReturn).catch(next);
  };
