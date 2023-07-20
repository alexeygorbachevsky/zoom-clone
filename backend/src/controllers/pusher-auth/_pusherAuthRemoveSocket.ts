import { Request, Response } from "express";

import { removeSocketRedis } from "../../redis/_index";

// ngrok http 5001
// taskkill /f /im ngrok.exe

export const pusherAuthRemoveSocket = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.body.socketId;
  const roomId = req.body.roomId;

  await removeSocketRedis({
    userId,
    roomId,
  });

  res.send({ isSocketRemoved: true });
};
