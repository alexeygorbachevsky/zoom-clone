import React, { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";

import { ACTIONS } from "constants/web-rtc";

import { useMobX } from "hooks";

import clearAllRooms from "api/clearAllRooms";
import removeSocket from "api/removeSocket";

import { history } from "helpers/history";

import { joinRoom } from "./helpers";

import styles from "./MainPage.module.scss";

const { wrapper } = styles;

const MainPage = observer(() => {
  history.navigate = useNavigate();
  history.location = useLocation();

  const [joiningRoomId, setJoiningRoomId] = useState("");

  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");

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

  // TODO: admin
  const onClearRooms = async () => {
    try {
      const isCleared = await clearAllRooms();

      // eslint-disable-next-line no-console
      console.log("isCleared", isCleared);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("Clear rooms error", err);
    }
  };

  const onChangeRoomId = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const onRemoveSocket = async () => {
    try {
      const isCleared = await removeSocket({ roomId, userId });

      // eslint-disable-next-line no-console
      console.log("isCleared", isCleared);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("Clear rooms error", err);
    }
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
      <button onClick={onClearRooms}>Clear all rooms</button>

      <input value={roomId} onChange={onChangeRoomId} />
      <input value={userId} onChange={onChangeUserId} />
      <button onClick={onRemoveSocket}>Remove socket</button>
    </div>
  );
});

export default MainPage;
