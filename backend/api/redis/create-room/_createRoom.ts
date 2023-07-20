import { redisClient, connectRedis, disconnectRedis } from "../_index";
import { getNewUserId } from "../helpers/_getNewUserId";
import { getNewRoomId } from "./ducks/_helpers";

interface Return {
  roomId: string;
  userId: string;
}

const createRoom = async (): Promise<Return> => {
  let roomId = null;
  let userId = null;

  try {
    await connectRedis();

    userId = await getNewUserId() as string;
    roomId = await getNewRoomId() as string;

    await redisClient.hSet("rooms", roomId, JSON.stringify([userId]));
  } catch (err) {
    console.log("Error", err);

    throw err;
  } finally {
    await disconnectRedis();
  }

  return { userId, roomId };
};

export default createRoom;
