import { v4 as uuid } from "uuid";
import { redisClient } from "./_redisClient";

export const getNewUserId = async (userId?: string) => {
  const newUserId = uuid();

  if (newUserId === userId) {
    getNewUserId(newUserId);

    return;
  }

  const allRooms = await redisClient.hGetAll("rooms");

  for (const roomId of Object.keys(allRooms)) {
    const roomMembers = JSON.parse(allRooms[roomId] as string);

    const isExisted = roomMembers.find(
      (memberId: string) => memberId === newUserId,
    );

    if (isExisted) {
      getNewUserId(newUserId);

      return;
    }
  }

  return newUserId;
};
