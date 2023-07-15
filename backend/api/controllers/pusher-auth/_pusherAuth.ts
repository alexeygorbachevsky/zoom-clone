import { NextFunction, Request, Response } from "express";

import { ACTIONS } from "../../constants/_web-rtc";
import { createRoom, joinRoom } from "./helpers/_index";

// ngrok http 5001
// taskkill /f /im ngrok.exe

export const pusherAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const socketId = req.body.socketId;
  const channel = req.body.channelName;
  const action = req.body.action;
  const roomId = req.body.roomId;

  const args = {
    socketId,
    channel,
    next,
  };

  let pusher = null;

  if (action === ACTIONS.JOIN_ROOM) {
    pusher = await joinRoom({ ...args, roomId });
  }

  if (action === ACTIONS.CREATE_ROOM) {
    pusher = await createRoom(args);
  }

  if (!pusher) {
    return;
  }

  // This authenticates every user
  const authResponse = pusher.authorizeChannel(socketId, channel);

  res.send(authResponse);
};
