import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { WebError } from "../constants/_types";

export const _errorHandler = (
  err: WebError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res
    .status(err.status || 500)
    .send({ error: err.message || "Internal Server Error" });

  next(err);
};

export const errorNotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  next(createError(404));
};
