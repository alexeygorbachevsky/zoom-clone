import React, { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";

import { ACTIONS } from "constants/web-rtc";

import { useMobX } from "hooks";

import { history } from "helpers/history";

import { joinRoom } from "./helpers";

import styles from "./MainPage.module.scss";

const { wrapper } = styles;

const MainPage = observer(() => {
  history.navigate = useNavigate();
  history.location = useLocation();

  const [joiningRoomId, setJoiningRoomId] = useState("");

  const { main } = useMobX();
  const { pusher } = main;

  const onCreateRoom = () => {
    joinRoom({ main, action: ACTIONS.createRoom });
  };

  const onJoinRoom = () => {
    joinRoom({ main, roomId: joiningRoomId });
  };

  const onChangeJoinRoomInput = (e: ChangeEvent<HTMLInputElement>) => {
    setJoiningRoomId(e.target.value);
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
