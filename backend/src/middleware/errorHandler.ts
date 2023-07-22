import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { WebError } from "../types";

const errorHandler = (
  err: WebError,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res
    .status(err.status || 500)
    .send({ error: err.message || "Internal Server Error" });

  next(err);
};

export const errorNotFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(createError(404));
};

export default errorHandler;
