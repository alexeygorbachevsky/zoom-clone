import axios from "axios";

import { DOMAIN } from "constants/api";

interface Params {
  channelName: string;
  roomId?: string;
  socketId: string;
  action?: string;
}

const fetchAuthToken = async (params: Params) => {
  const response = await axios.post(`${DOMAIN}/pusher/auth`, params);

  return response.data;
};

export default fetchAuthToken;
