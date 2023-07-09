import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Pusher from "pusher-js";

import {
  CHANNEL,
  EVENTS,
  ICE_CANDIDATE_EXCHANGE_EVENT,
} from "constants/web-rtc";

import styles from "./MainPage.module.scss";

const { wrapper } = styles;

const MainPage = () => {
  const [pusher, setPusher] = useState<Pusher | null>(null);
  // const navigate = useNavigate();

  const createRoom = () => {
    const authPusher = new Pusher(process.env.PUSHER_KEY!, {
      channelAuthorization: {
        endpoint: "https://localhost:5001/pusher/auth",
        transport: "jsonp",
        params: {
          action: "create-room",
        },
      },
      cluster: process.env.PUSHER_CLUSTER!,
      forceTLS: true,
    });

    setPusher(authPusher);

    authPusher.connection.bind("connected", (data: any) => {
      console.log("Connected", JSON.stringify(data));

      const channel = authPusher.subscribe(CHANNEL);

      channel.bind(EVENTS.ROOM_CREATED, (roomId: string) => {
        console.log("roomId", roomId);
        // navigate(`${ROUTES.room}/${roomId}`);
      });
    });

    authPusher.connection.bind("error", (err: Error) => {
      console.log("Error", err);
    });
  };

  const sendEvent = () => {
    if (!pusher) {
      return;
    }

    pusher.send_event(
      ICE_CANDIDATE_EXCHANGE_EVENT,
      {
        message: "hello buddies",
      },
      CHANNEL,
    );
  };

  useEffect(() => {
    return () => {
      pusher?.disconnect();
    };
  }, []);

  return (
    <div className={wrapper}>
      <button onClick={createRoom}>Create room</button>
    </div>
  );
};

export default MainPage;
