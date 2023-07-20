import { redisClient, connectRedis, disconnectRedis } from "../_index";

interface Args {
  userId: string;
  roomId: string;
}

const removeSocket = async ({ userId, roomId }: Args) => {
  try {
    await connectRedis();

    const allRooms = await redisClient.hGetAll("rooms");

    const roomMembers = JSON.parse(allRooms[roomId] as string);

    const filteredMembers = roomMembers.filter((id: string) => id !== userId);

    if (filteredMembers.length) {
      await redisClient.hSet("rooms", roomId, JSON.stringify(filteredMembers));
    } else {
      await redisClient.hDel("rooms", roomId);
    }
  } catch (err) {
    console.log("Error", err);

    throw err;
  }

  await disconnectRedis();
};

export default removeSocket;
