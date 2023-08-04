import { v4 as uuid } from "uuid";
import Pusher from "pusher-js";

import { Actions, CHANNEL } from "constants/web-rtc";
import { ROUTES } from "constants/routes";

import { store } from "store";
import { AlertTypes } from "store/stores/alerts";

import getPusher from "helpers/pusher";
import { history } from "helpers/history";

interface JoinRoom {
  action: Actions;
  roomId?: string;
  shouldRedirect?: boolean;
}

const handleError = (pusher: Pusher) => {
  const { main, alerts } = store;

  alerts.addAlert({
    id: uuid(),
    type: AlertTypes.error,
    message: "Error is occurred. Please try again.",
    timeout: 3000,
  });
  main.setPusher(null);
  main.setUserId(null);
  main.setPusherError("Error is occured");
  main.setIsRoomJoining(false);
  main.setIsLoadingPusher(false);

  pusher.disconnect();
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
          history.navigate!(`/${ROUTES.room}/${data.me.info.roomId}`, {
            replace: true,
          });
        }
      });

      channel.bind("pusher:subscription_error", () => {
        handleError(authPusher);
      });
    });

    authPusher.connection.bind("error", () => {
      handleError(authPusher);
    });
  } catch (err) {
    handleError(authPusher);
  }
};
