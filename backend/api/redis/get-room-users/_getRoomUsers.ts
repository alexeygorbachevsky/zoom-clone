import { redisClient, connectRedis, disconnectRedis } from "../_index";

const clearRooms = async (roomId: string): Promise<string[]> => {
  let roomUsers = [];

  try {
    await connectRedis();

    const room = await redisClient.hGet("rooms", roomId);

    if (!room) {
      return [];
    }

    roomUsers = JSON.parse(room);
  } catch (err) {
    console.log("Error", err);

    throw err;
  } finally {
    await disconnectRedis();
  }

  return roomUsers;
};

export default clearRooms;
