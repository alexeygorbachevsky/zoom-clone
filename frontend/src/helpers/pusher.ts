import Pusher from "pusher-js";

import fetchPusherAuthToken from "api/fetchPusherAuthToken";

interface Args {
  action?: string;
  roomId?: string;
  userId?: string;
}

const getPusher = ({ action, roomId, userId }: Args) =>
  new Pusher(process.env.PUSHER_KEY!, {
    authorizer: channel => ({
      authorize: async (socketId, callback) => {
        try {
          const data = await fetchPusherAuthToken({
            channelName: channel.name,
            roomId,
            socketId,
            action,
            userId,
          });

          // eslint-disable-next-line no-console
          console.log("data", data)

          callback(null, data);
        } catch (err) {
          // TODO:
          // eslint-disable-next-line no-console
          console.log("Error", err);

          const error = err as Error;
          callback(error, null);
        }
      },
    }),
    cluster: process.env.PUSHER_CLUSTER!,
    forceTLS: true,
  });

export default getPusher;
