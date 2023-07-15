import { Request, Response } from "express";

export const home = async (req: Request, res: Response): Promise<void> => {
  res.json("Hello buddy");
};
