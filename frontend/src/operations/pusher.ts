import { v4 as uuid } from "uuid";
import Pusher from "pusher-js";

import { Actions, CHANNEL } from "constants/web-rtc";
import { ROUTES } from "constants/routes";

import { store } from "store";
import { AlertTypes } from "store/stores/alerts";

import fetchAuthToken from "api/fetchAuthToken";

import { HISTORY } from "constants/history";

interface Args {
  action?: string;
  roomId?: string;
}

export const getPusher = ({ action, roomId }: Args) =>
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

interface JoinRoom {
  action: Actions;
  roomId?: string;
  shouldRedirect?: boolean;
}

const handleError = (pusher: Pusher, isRateLimits?: boolean) => {
  const { main, alerts } = store;

  alerts.addAlert({
    id: uuid(),
    type: AlertTypes.error,
    message: isRateLimits
      ? "Rejected client event because of rate limiting."
      : "Error is occurred. Please try again.",
    timeout: 5000,
  });

  // sometimes Pusher send a lot of messages that cause rate limits error,
  // but we don't want to stop app working in this case
  if (!isRateLimits) {
    main.setPusher(null);
    main.setUserId(null);
    main.setPusherError("Error is occured");
    main.setIsRoomJoining(false);
    main.setIsLoadingPusher(false);

    pusher.disconnect();
  }
};

export const initializePusher = ({
  action,
  roomId,
  shouldRedirect = true,
}: JoinRoom) => {
  const { main } = store;

  let authPusher: Pusher = null as unknown as Pusher;

  try {
    authPusher = getPusher({ action, roomId });

    authPusher.connection.bind("connected", () => {
      const channel = authPusher.subscribe(CHANNEL);

      // TODO: data ts
      // eslint-disable-next-line
      channel.bind("pusher:subscription_succeeded", (data: any) => {
        main.setPusher(authPusher);
        main.setUserId(data.me.id);
        main.setIsRoomJoining(false);
        main.setIsLoadingPusher(false);

        if (shouldRedirect) {
          HISTORY.navigate!(`/${ROUTES.room}/${data.me.info.roomId}`, {
            replace: true,
          });
        }
      });

      channel.bind("pusher:subscription_error", () => {
        handleError(authPusher);
      });
    });

    authPusher.connection.bind("error", (error: { data: { code: number } }) => {
      let isRateLimits = false;
      if (error.data?.code === 4301) {
        isRateLimits = true;
      }

      handleError(authPusher, isRateLimits);
    });
  } catch (err) {
    handleError(authPusher);
  }
};
