import { validate, version } from "uuid";
import { WebError } from "../types";

export const validateRoomId = (roomId: string) => {
  if (!roomId) {
    const error: WebError = new Error(
      "Room id is not provided",
    );
    error.status = 400;

    throw error;
  }

  if(!validate(roomId) || version(roomId) !== 4){
    const error: WebError = new Error(
        "Room id has incorrect format",
    );
    error.status = 400;

    throw error;
  }
};
