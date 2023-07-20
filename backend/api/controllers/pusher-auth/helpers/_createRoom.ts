import { createRoomRedis } from "../../../redis/_index";
import { WebError } from "../../../constants/_types";

const createRoom = async () => {
  const { userId, roomId } = await createRoomRedis();

  if (!roomId) {
    const error: WebError = new Error("Room creation error");
    error.status = 500;

    throw error;
  }

  return { userId, roomId };
};

export default createRoom;
