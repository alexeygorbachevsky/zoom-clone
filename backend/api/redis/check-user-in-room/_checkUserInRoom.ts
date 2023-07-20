import { redisClient, connectRedis, disconnectRedis } from "../_index";

interface Args {
  roomId: string;
  userId: string;
}

const checkUserInRoom = async ({ roomId, userId }: Args) => {
  try {
    await connectRedis();

    const room = await redisClient.hGet("rooms", roomId);

    if (!room) {
      throw new Error(`No room: "${roomId}" found`);
    }

    const roomMembers = JSON.parse(room);

    const userMember = roomMembers.find((member: string) => member === userId);

    if (!userMember) {
      throw new Error(`No user: "${userId}" found in room: "${roomId}"`);
    }
  } catch (err) {
    console.log("Error", err);

    throw err;
  } finally {
    await disconnectRedis();
  }
};

export default checkUserInRoom;
