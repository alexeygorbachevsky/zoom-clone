import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { validate, version } from "uuid";

import { Actions } from "constants/web-rtc";

import LinearLoader from "components/linear-loader";

import Input from "basics/input";
import Button from "basics/button";

import useMobX from "hooks/use-mobx";

import { initializePusher as joinRoom } from "operations/pusher";

import styles from "./JoinRoomPage.module.scss";
import { KeyCodes } from "../../constants/keyCodes";

const JoinRoomPage = observer(() => {
  const [isRoomIdError, setIsRoomIdError] = useState(false);
  const [roomId, setRoomId] = useState("");

  const { main } = useMobX();
  const { isRoomJoining } = main;

  const onRoomIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsRoomIdError(false);
    setRoomId(e.target.value);
  };

  const onJoinRoom = () => {
    if (isRoomJoining) {
      return;
    }

    if (!validate(roomId) || version(roomId) !== 4) {
      setIsRoomIdError(true);
      return;
    }

    main.setIsRoomJoining(true);

    joinRoom({ action: Actions.joinRoom, roomId });
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KeyCodes.Enter) {
      onJoinRoom();
    }
  };

  return (
    <>
      {isRoomJoining && <LinearLoader />}
      <main className={styles.wrapper}>
        <h1 className={styles.title}>Join Room</h1>
        <Input
          error={
            isRoomIdError ? "Entered value is not in the correct format" : ""
          }
          wrapperClassname={styles.inputWrapper}
          className={styles.input}
          label="Room ID"
          placeholder="Enter room ID"
          value={roomId}
          onChange={onRoomIdChange}
          onKeyDown={onInputKeyDown}
        />
        <Button
          as={Link}
          disabled={!roomId || isRoomJoining}
          className={classnames(styles.button, {
            [styles.disabledButton]: !roomId,
          })}
          onClick={onJoinRoom}
        >
          Join
        </Button>
      </main>
    </>
  );
});

export default JoinRoomPage;
