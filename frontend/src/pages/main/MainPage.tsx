import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
// import { useNavigate } from "react-router-dom";

import {
  CHANNEL,
  ICE_CANDIDATE_EXCHANGE_EVENT,
} from "constants/web-rtc";

import { useMobX } from "hooks";

import { createRoom, joinRoom } from "./helpers";

import styles from "./MainPage.module.scss";

const { wrapper } = styles;

const MainPage = observer(() => {
  const [joiningRoomId, setJoiningRoomId] = useState("");
  const { main } = useMobX();
  const { pusher } = main;
  // const navigate = useNavigate();

  const onCreateRoom = useCallback(() => {
    createRoom({ main });
  }, [main]);

  const onJoinRoom = useCallback(() => {
    joinRoom({ main, roomId: joiningRoomId });
  }, [main, joiningRoomId]);

  const onChangeJoinRoomInput = (e: ChangeEvent<HTMLInputElement>) => {
    setJoiningRoomId(e.target.value);
  };

  // eslint-disable-next-line
  const sendEvent = () => {
    pusher?.send_event(
      ICE_CANDIDATE_EXCHANGE_EVENT,
      {
        message: "hello buddies",
      },
      CHANNEL,
    );
  };

  useEffect(
    () => () => {
      pusher?.disconnect();
    },
    [],
  );

  return (
    <div className={wrapper}>
      <button onClick={onCreateRoom}>Create room</button>
      <input value={joiningRoomId} onChange={onChangeJoinRoomInput} />
      <button onClick={onJoinRoom}>Join room</button>
    </div>
  );
});

export default MainPage;
