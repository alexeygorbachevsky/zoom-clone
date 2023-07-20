import { v4 as uuid } from "uuid";
import { redisClient } from "../../helpers/_redisClient";
import { getNewUserId } from "../../helpers/_getNewUserId";

export const getNewRoomId = async (roomId?: string) => {
  const newRoomId = uuid();

  if (newRoomId === roomId) {
    getNewUserId(newRoomId);

    return;
  }

  const isRoomExisted = await redisClient.get(newRoomId);

  if (isRoomExisted) {
    getNewRoomId(newRoomId);

    return;
  }

  return newRoomId;
};
