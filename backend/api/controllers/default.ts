import { Request, Response } from "express";

export const defaultController = async (req: Request, res: Response): Promise<void> => {
  res.json({ title: "Express" });
};
