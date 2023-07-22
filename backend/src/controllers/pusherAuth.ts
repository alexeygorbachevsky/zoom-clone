import { NextFunction, Request, Response } from "express";

import { ACTIONS, CHANNEL } from "../constants/web-rtc";
import { getPusher } from "../helpers/pusher";
import createRoom from "../redis/createRoom";
import joinRoom from "../redis/joinRoom";

const pusherAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { socketId, channelName, action, roomId } = req.body;

  if (channelName !== CHANNEL) {
    next(new Error("Incorrect channel name"));
  }

  let currentRoomId = roomId;

  switch (action) {
    case ACTIONS.createRoom: {
      currentRoomId = await createRoom();
      break;
    }

    case ACTIONS.joinRoom: {
      await joinRoom(roomId);

      break;
    }

    default: {
      next(new Error("No valid action provided"));
      break;
    }
  }

  const authResponse = getPusher().authorizeChannel(socketId, channelName, {
    user_id: socketId,
    user_info: {
      roomId: currentRoomId,
    },
  });

  res.send(authResponse);
};

export default pusherAuth;
