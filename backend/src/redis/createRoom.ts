import {
  redisClient,
  connectRedis,
  disconnectRedis,
  clearRoomsInTime,
} from "./redisClient";
import { getNewRoomId } from "../helpers/getNewRoomId";

const createRoom = async (): Promise<string> => {
  let roomId: string| null = null;

  try {
    await connectRedis();
    await clearRoomsInTime();

    const existedRoomIds = await redisClient.hGetAll("rooms");

    roomId = getNewRoomId(existedRoomIds) as string;

    await redisClient.hSet("rooms", roomId, roomId)
  } catch (err) {
    console.log("Error", err);

    throw err;
  } finally {
    await disconnectRedis();
  }

  return roomId;
};

export default createRoom;
