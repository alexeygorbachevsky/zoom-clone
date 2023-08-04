import Pusher from "pusher-js";

import fetchAuthToken from "api/fetchAuthToken";

interface Args {
  action?: string;
  roomId?: string;
}

const getPusher = ({ action, roomId }: Args) =>
  new Pusher(process.env.PUSHER_KEY!, {
    authorizer: channel => ({
      authorize: async (socketId, callback) => {
        try {
          const data = await fetchAuthToken({
            channelName: channel.name,
            roomId,
            socketId,
            action,
          });
          callback(null, data);
        } catch (err) {
          const error = err as Error;
          callback(error, null);
        }
      },
    }),
    cluster: process.env.PUSHER_CLUSTER!,
    forceTLS: true,
  });

export default getPusher;
