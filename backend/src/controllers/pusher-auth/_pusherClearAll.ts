import { Request, Response } from "express";

import clearRooms from "../../redis/clear-rooms/_clearRooms";

export const pusherAuthClearAll = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  await clearRooms();

  res.send({ isCleared: true });
};
