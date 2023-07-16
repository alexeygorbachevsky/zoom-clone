import { NextFunction, Request, Response } from "express";

import { ACTIONS } from "../../constants/_web-rtc";
import { createRoom, joinRoom } from "./helpers/_index";
import { getPusher } from "../../helpers/_pusher";

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

  const pusher = getPusher();

  const args = {
    socketId,
  };

  let error = null;

  if (action === ACTIONS.CREATE_ROOM) {
    error = await createRoom(args);
  }

  if (action === ACTIONS.JOIN_ROOM) {
    error = await joinRoom({ ...args, roomId });
  }

  if (error) {
    next(error);

    return;
  }

  // This authenticates every user
  const authResponse = pusher.authorizeChannel(socketId, channel, {
    user_id: socketId,
    user_info: {
      doneAction: action,
    },
  });

  res.send(authResponse);
};
