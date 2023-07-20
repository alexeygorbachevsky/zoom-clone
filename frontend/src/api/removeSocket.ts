import axios from "axios";

import { apiConstants } from "./ducks";

const { DOMAIN } = apiConstants;

interface Args {
  roomId: string;
  userId: string;
}

const removeSocket = async (args: Args) => {
  const response = await axios.post(
    `${DOMAIN[process.env.NODE_ENV]}/pusher/auth/remove-socket`,
      args,
  );

  return response.data;
};

export default removeSocket;
