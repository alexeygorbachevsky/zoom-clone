import { ACTIONS, CHANNEL, EVENTS } from "constants/web-rtc";

import { MainStore } from "store/stores";
import getAuthPusher from "pages/main/helpers/getAuthPusher";

const joinRoom = ({
  main,
  roomId,
}: {
  main: MainStore;
  roomId: string;
}) => {
  try {
    const authPusher = getAuthPusher({ action: ACTIONS.JOIN_ROOM, roomId });

    if (!authPusher) {
      return;
    }

    authPusher.connection.bind("connected", (data: never) => {
      // eslint-disable-next-line no-console
      console.log("Connected", JSON.stringify(data));

      const channel = authPusher.subscribe(CHANNEL);

      // eslint-disable-next-line no-console
      console.log("channel", channel);

      channel.bind(EVENTS.ROOM_JOINED, (roomId: string) => {
        main.setPusher(authPusher);

        // eslint-disable-next-line no-console
        console.log("joined roomId", roomId);
        // navigate(`${ROUTES.room}/${roomId}`);
      });

      channel.bind("pusher:subscription_error", () => {
        // eslint-disable-next-line no-console
        console.log("Joining error");
      });
    });

    authPusher.connection.bind("error", (err: Error) => {
      // eslint-disable-next-line no-console
      console.log("Error", err);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Error", err);
  }
};

export default joinRoom;
