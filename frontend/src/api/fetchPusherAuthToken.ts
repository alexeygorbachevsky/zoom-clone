import axios from "axios";

import { apiConstants } from "./ducks";

const { DOMAIN } = apiConstants;

interface Params {
  socketId: string;
  action: string;
  channelName: string;
  roomId?: string;
}

const fetchPusherAuthToken = async (params: Params) => {
  const response = await axios.post(
    `${DOMAIN[process.env.NODE_ENV]}/pusher/auth`,
    params,
  );

  return response.data.auth;
};

export default fetchPusherAuthToken;
