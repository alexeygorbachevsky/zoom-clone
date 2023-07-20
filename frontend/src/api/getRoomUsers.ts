import axios from "axios";

import { apiConstants } from "./ducks";

const { DOMAIN } = apiConstants;

const getRoomUsers = async (roomId: string): Promise<string[]> => {
  const response = await axios.get(
    `${
      DOMAIN[process.env.NODE_ENV]
    }/pusher/auth/get-room-users?roomId=${roomId}`,
  );

  return response.data;
};

export default getRoomUsers;
