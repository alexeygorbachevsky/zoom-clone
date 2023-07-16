import { WebError } from "../../../constants/_types";
import { joinRoomDB } from "../../../redis/_index";

interface JoinRoomArgs {
  socketId: string;
  roomId: string;
}

const joinRoom = async ({
  socketId,
  roomId,
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

  return null;
};

export default joinRoom;
