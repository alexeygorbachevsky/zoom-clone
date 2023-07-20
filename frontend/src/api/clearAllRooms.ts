import axios from "axios";

import { apiConstants } from "./ducks";

const { DOMAIN } = apiConstants;

const clearAllRooms = async () => {
  const response = await axios.delete(
    `${DOMAIN[process.env.NODE_ENV]}/pusher/auth/clear-all-rooms`,
  );

  return response.data;
};

export default clearAllRooms;
