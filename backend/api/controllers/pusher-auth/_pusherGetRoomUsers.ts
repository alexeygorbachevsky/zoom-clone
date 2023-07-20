import { Request, Response } from "express";

import getRoomUsers from "../../redis/get-room-users/_getRoomUsers";

export const pusherGetRoomUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log("req.params.roomId", req.params.roomId);
  const roomUsers = await getRoomUsers(req.query.roomId as string);

  res.send(roomUsers);
};
