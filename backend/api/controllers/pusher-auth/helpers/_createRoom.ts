import { createRoomDB } from "../../../redis/_index";
import { WebError } from "../../../constants/_types";

interface CreateRoomArgs {
  socketId: string;
}

const createRoom = async ({ socketId }: CreateRoomArgs) => {
  const newRoomId = await createRoomDB(socketId);

  if (!newRoomId) {
    const error: WebError = new Error("Room creation error");
    error.status = 500;

    throw error;
  }

  return newRoomId;
};

export default createRoom;
