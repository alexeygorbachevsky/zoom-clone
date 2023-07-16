import Pusher from "pusher-js";

import fetchPusherAuthToken from "api/fetchPusherAuthToken";

interface Args {
  action: string;
  roomId?: string;
}

const getAuthPusher = ({ action, roomId }: Args) =>
  new Pusher(process.env.PUSHER_KEY!, {
    authorizer: channel => ({
      authorize: async (socketId, callback) => {
        try {
          const result = await fetchPusherAuthToken({
            socketId,
            action,
            channelName: channel.name,
            roomId,
          });

          callback(null, result);
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

export default getAuthPusher;
