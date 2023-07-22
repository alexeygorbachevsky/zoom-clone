import { Request, Response } from "express";

export const getHome = async (_req: Request, res: Response): Promise<void> => {
  res.json("Hello buddy");
};
