import axios from "axios";

import { apiConstants } from "./ducks";

const { DOMAIN } = apiConstants;

interface Params {
  channelName: string;
  roomId?: string;
  socketId: string;
  action?: string;
  userId?: string;
}

const fetchPusherAuthToken = async (params: Params) => {
  const response = await axios.post(
    `${DOMAIN[process.env.NODE_ENV]}/pusher/auth`,
    params,
  );

  return response.data;
};

export default fetchPusherAuthToken;
