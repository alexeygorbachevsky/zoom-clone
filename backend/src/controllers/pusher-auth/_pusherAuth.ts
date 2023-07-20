import { NextFunction, Request, Response } from "express";

import { ACTIONS, CHANNEL } from "../../constants/_web-rtc";
import { createRoom, joinRoom } from "./helpers/_index";
import { getPusher } from "../../helpers/_pusher";
import { checkUserInRoomRedis } from "../../redis/_index";

// ngrok http 5001
// taskkill /f /im ngrok.exe

export const pusherAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { socketId, channelName, action, roomId, userId } = req.body;

  if (channelName !== CHANNEL) {
    next(new Error("Incorrect channel name"));
  }

  const pusher = getPusher();

  let currentRoomId = roomId;
  let currentUserId = userId;

  switch (action) {
    case ACTIONS.createRoom: {
      const { roomId, userId } = await createRoom();
      currentRoomId = roomId;
      currentUserId = userId;

      break;
    }

    case ACTIONS.joinRoom: {
      currentUserId = await joinRoom({ userId, roomId });

      break;
    }

    default: {
      await checkUserInRoomRedis({ roomId, userId });
    }
  }

  const authResponse = pusher.authorizeChannel(socketId, channelName, {
    user_id: currentUserId,
    user_info: {
      roomId: currentRoomId,
    },
  });

  res.send(authResponse);
};
