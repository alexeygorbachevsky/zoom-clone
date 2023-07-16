import Pusher from "pusher";

import { EVENTS } from "../../../constants/_web-rtc";
import { WebError } from "../../../constants/_types";
import { joinRoomDB } from "../../../redis/_index";

interface JoinRoomArgs {
  socketId: string;
  channel: string;
  roomId: string;
  pusher: Pusher;
}

const joinRoom = async ({
  socketId,
  channel,
  roomId,
  pusher,
}: JoinRoomArgs) => {
  if (!roomId) {
    const error: WebError = new Error(
      "Room joining error. Room id is not provided by client.",
    );
    error.status = 400;

    return error;
  }

  const isJoined = await joinRoomDB(roomId, socketId);

  if (!isJoined) {
    const error: WebError = new Error(
      "Room joining error. Room id is not present.",
    );
    error.status = 404;

    return error;
  }

  pusher.trigger(channel, EVENTS.ROOM_JOINED, roomId);

  return null;
};

export default joinRoom;
