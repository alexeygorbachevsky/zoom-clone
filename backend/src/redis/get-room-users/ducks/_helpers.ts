import { v4 as uuid } from "uuid";
import { redisClient } from "../../helpers/_redisClient";

export const getNewRoomId = async () => {
  const newRoomId = uuid();
  const isRoomExisted = await redisClient.get(newRoomId);

  if (isRoomExisted) {
    getNewRoomId();

    return;
  }

  return newRoomId;
};
