import {
  redisClient,
  connectRedis,
  disconnectRedis,
  clearRoomsInTime,
} from "./redisClient";
import { validateRoomId } from "../helpers/validateRoomId";
import { WebError } from "../types";

const joinRoom = async (roomId: string) => {
  try {
    validateRoomId(roomId);

    await connectRedis();
    await clearRoomsInTime();

    const room = await redisClient.hGet("rooms", roomId);

    if (!room) {
      const error: WebError = new Error("Provided room id is not existed");
      error.status = 400;

      throw error;
    }
  } catch (err) {
    console.log("Error", err);

    throw err;
  } finally {
    await disconnectRedis();
  }
};

export default joinRoom;
