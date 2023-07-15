import { ACTIONS, CHANNEL, EVENTS } from "constants/web-rtc";

import { MainStore } from "store/stores";

import { getAuthPusher } from "pages/main/helpers";

const createRoom = ({ main }: { main: MainStore }) => {
  const authPusher = getAuthPusher({ action: ACTIONS.CREATE_ROOM });

  if (!authPusher) {
    return;
  }

  authPusher.connection.bind("connected", (data: never) => {
    // eslint-disable-next-line no-console
    console.log("Connected", JSON.stringify(data));

    const channel = authPusher.subscribe(CHANNEL);

    channel.bind(EVENTS.ROOM_CREATED, (roomId: string) => {
      main.setPusher(authPusher);

      // eslint-disable-next-line no-console
      console.log("created roomId", roomId);
      // navigate(`${ROUTES.room}/${roomId}`);
    });

    channel.bind("pusher:subscription_error", () => {
      // eslint-disable-next-line no-console
      console.log("Creating error");
    });
  });

  authPusher.connection.bind("error", (err: Error) => {
    // eslint-disable-next-line no-console
    console.log("Error", err);
  });
};

export default createRoom;
