import { WebError } from "../../../constants/_types";
import { joinRoomRedis } from "../../../redis/_index";

interface JoinRoomArgs {
  userId?: string;
  roomId: string;
}

const joinRoom = async ({ userId, roomId }: JoinRoomArgs) => {
  if (!roomId) {
    const error: WebError = new Error(
      "Room joining error. Room id is not provided by client.",
    );
    error.status = 400;

    throw error;
  }

  const currentUserId = await joinRoomRedis(roomId, userId);

  if (!currentUserId) {
    const error: WebError = new Error(
      "Room joining error. Room id is not present.",
    );
    error.status = 404;

    throw error;
  }

  return currentUserId;
};

export default joinRoom;
