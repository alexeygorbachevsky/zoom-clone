import { NextFunction } from "express";

import { EVENTS } from "../../../constants/_web-rtc";
import { WebError } from "../../../constants/_types";
import { joinRoomDB } from "../../../redis/_index";
import { getPusher } from "../../../helpers/_pusher";

interface JoinRoomArgs {
  socketId: string;
  channel: string;
  roomId: string;
  next: NextFunction;
}

const joinRoom = async ({ socketId, channel, roomId, next }: JoinRoomArgs) => {
  if (!roomId) {
    const err: WebError = new Error(
      "Room joining error. Room id is not provided by client.",
    );
    err.status = 400;

    next(err);

    return;
  }

  const isJoined = await joinRoomDB(roomId, socketId);

  if (!isJoined) {
    const err: WebError = new Error(
      "Room joining error. Room id is not present.",
    );
    err.status = 404;

    next(err);

    return;
  }

  const pusher = getPusher();

  pusher.trigger(channel, EVENTS.ROOM_JOINED, roomId);

  return pusher;
};

export default joinRoom;
