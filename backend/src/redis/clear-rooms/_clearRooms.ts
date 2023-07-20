import { redisClient, connectRedis, disconnectRedis } from "../_index";

const clearRooms = async (): Promise<boolean> => {
  try {
    await connectRedis();

    await redisClient.flushDb();

  } catch (err) {
    console.log("Error", err);

    throw err;
  }

  await disconnectRedis();

  return true;
};

export default clearRooms;
