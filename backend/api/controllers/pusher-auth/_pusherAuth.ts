import { Request, Response } from "express";

import { ACTIONS } from "../../constants/_web-rtc";
import { createRoom, joinRoom } from "./helpers/_index";
import { getPusher } from "../../helpers/_pusher";

// ngrok http 5001
// taskkill /f /im ngrok.exe

export const pusherAuth = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const socketId = req.body.socketId;
  const channel = req.body.channelName;
  const action = req.body.action;
  const roomId = req.body.roomId;

  const pusher = getPusher();

  const args = {
    socketId,
  };

  let currentRoomId = roomId;

  if (action === ACTIONS.CREATE_ROOM) {
    currentRoomId = await createRoom(args);
  }

  if (action === ACTIONS.JOIN_ROOM) {
    await joinRoom({ ...args, roomId });
  }

  // This authenticates every user
  const authResponse = pusher.authorizeChannel(socketId, channel, {
    user_id: socketId,
    user_info: {
      doneAction: action,
      roomId: currentRoomId,
    },
  });

  res.send(authResponse);
};
