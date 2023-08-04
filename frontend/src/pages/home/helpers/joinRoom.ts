import { Actions, CHANNEL } from "constants/web-rtc";

import { MainStore } from "store/stores";

import getPusher from "helpers/pusher";
import { history } from "helpers/history";

import { ROUTES } from "constants/routes";

const joinRoom = ({
  main,
  roomId,
  action = Actions.joinRoom,
}: {
  main: MainStore;
  roomId?: string;
  action?: string;
}) => {
  try {
    const authPusher = getPusher({ action, roomId });

    if (!authPusher) {
      return;
    }

    authPusher.connection.bind("connected", (data: never) => {
      // eslint-disable-next-line no-console
      console.log("Connected", JSON.stringify(data));

      const channel = authPusher.subscribe(CHANNEL);

      // eslint-disable-next-line no-console
      console.log("channel", channel);

      // eslint-disable-next-line
      channel.bind("pusher:subscription_succeeded", (data: any) => {
        // eslint-disable-next-line no-console
        console.log("pusher:subscription_succeeded", data);

        main.setPusher(authPusher);
        main.setUserId(data.me.id);


        history.navigate!(
          `/${ROUTES.room}/${data.me.info.roomId}`,
          {
            replace: true,
          },
        );
      });

      channel.bind("pusher:subscription_error", () => {
        // eslint-disable-next-line no-console
        console.log("Joining error");

        authPusher.disconnect();

        main.setPusher(null);
        main.setUserId(null);
      });
    });

    authPusher.connection.bind("error", (err: Error) => {
      // eslint-disable-next-line no-console
      console.log("Error", err);

      authPusher.disconnect();

      main.setPusher(null);
      main.setUserId(null);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Error", err);
  }
};

export default joinRoom;
