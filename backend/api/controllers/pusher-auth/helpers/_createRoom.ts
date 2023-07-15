import { NextFunction } from "express";

import { EVENTS } from "../../../constants/_web-rtc";
import { createRoomDB } from "../../../redis/_index";
import { WebError } from "../../../constants/_types";
import { getPusher } from "../../../helpers/_pusher";

interface CreateRoomArgs {
  socketId: string;
  channel: string;
  next: NextFunction;
}

const createRoom = async ({
  socketId,
  channel,
  next,
}: CreateRoomArgs) => {
  const newRoomId = await createRoomDB(socketId);

  if (!newRoomId) {
    const err: WebError = new Error("Room creation error");
    err.status = 500;

    next(err);

    return;
  }

  const pusher = getPusher();

  pusher.trigger(channel, EVENTS.ROOM_CREATED, newRoomId);

  return pusher;
};

export default createRoom;
