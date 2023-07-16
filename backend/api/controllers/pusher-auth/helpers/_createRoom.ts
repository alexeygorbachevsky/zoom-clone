import { createRoomDB } from "../../../redis/_index";
import { WebError } from "../../../constants/_types";

interface CreateRoomArgs {
  socketId: string;
}

interface Return {
  error: WebError | null;
  roomId: string | null;
}

const createRoom = async ({ socketId }: CreateRoomArgs): Promise<Return> => {
  const newRoomId = await createRoomDB(socketId);

  if (!newRoomId) {
    const error: WebError = new Error("Room creation error");
    error.status = 500;

    return { error, roomId: null };
  }

  return { error: null, roomId: newRoomId };
};

export default createRoom;
