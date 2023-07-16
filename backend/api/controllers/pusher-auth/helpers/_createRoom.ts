import Pusher from "pusher";

import { EVENTS } from "../../../constants/_web-rtc";
import { createRoomDB } from "../../../redis/_index";
import { WebError } from "../../../constants/_types";

interface CreateRoomArgs {
  socketId: string;
  channel: string;
  pusher: Pusher;
}

const createRoom = async ({ socketId, channel, pusher }: CreateRoomArgs) => {
  const newRoomId = await createRoomDB(socketId);

  if (!newRoomId) {
    const error: WebError = new Error("Room creation error");
    error.status = 500;

    return error;
  }

  pusher.trigger(channel, EVENTS.ROOM_CREATED, newRoomId);

  return null;
};

export default createRoom;
