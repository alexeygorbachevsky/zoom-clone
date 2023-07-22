import { v4 as uuid } from "uuid";
import { WebError } from "../types";

export const getNewRoomId = (existedRooms: Record<string, string>) => {
  const newRoomId = uuid();

  const isRoomExisted = existedRooms[newRoomId];

  if (isRoomExisted) {
    getNewRoomId(existedRooms);

    return;
  }

  if (!newRoomId) {
    const error: WebError = new Error("Room generation error");
    error.status = 500;

    throw error;
  }

  return newRoomId;
};
