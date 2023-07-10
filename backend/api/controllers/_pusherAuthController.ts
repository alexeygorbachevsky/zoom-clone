import { NextFunction, Request, Response } from "express";
import Pusher from "pusher";
import createError from "http-errors";

import { EVENTS } from "../constants/_web-rtc";
import { _createRoom } from "../redis/_index";

// ngrok http 5001
// taskkill /f /im ngrok.exe

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const query = req.query;
  const socketId = query.socket_id as string;
  const channel = query.channel_name as string;
  const callback = query.callback as string;
  const action = query.action as string;

  const newRoomId = await _createRoom(socketId);

  if (!newRoomId) {
    next(createError(500, { message: "Room creation error" }));

    return;
  }

  if (action === "create-room") {
    pusher.trigger(channel, EVENTS.ROOM_CREATED, "dsfsdsd--45-3--dsf-");
  }

  // This authenticates every user
  const auth = JSON.stringify(pusher.authorizeChannel(socketId, channel));

  console.log("auth", auth);

  const cb = `${callback.replace(/\\"/g, "")}(${auth});`;

  res.set({
    "Content-Type": "application/javascript",
  });

  res.send(cb);
};
