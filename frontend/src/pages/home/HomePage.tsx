import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import classnames from "classnames";

import chatImage from "assets/images/chat.png";
import barImage from "assets/images/bar.png";

import LinearLoader from "components/linear-loader";
import Alerts from "components/alerts";

import { ROUTES } from "constants/routes";
import { Actions } from "constants/web-rtc";

import useMobX from "hooks/use-mobx";

import { initializePusher as createRoom } from "operations/pusher";

import Button from "basics/button";

import styles from "./HomePage.module.scss";

const HomePage = observer(() => {
  const { main } = useMobX();

  const { isRoomJoining } = main;

  const onCreateRoom = () => {
    if (isRoomJoining) {
      return;
    }

    createRoom({ action: Actions.createRoom });

    main.setIsRoomJoining(true);
  };

  return (
    <>
      {isRoomJoining && <LinearLoader />}
      <main className={styles.wrapper}>
        <div className={styles.leftWrapper}>
          <h1>
            One platform to <span>connect</span>
          </h1>
          <p className={styles.text}>
            More connected, more collaborative, more intelligent. Zoom's
            AI-powered platform helps you do more.
          </p>
          <div className={styles.linksWrapper}>
            <Button as={Link} to={ROUTES.join} disabled={isRoomJoining}>
              Join room
            </Button>
            <Button
              onClick={onCreateRoom}
              disabled={isRoomJoining}
              className={classnames(styles.createRoomLink, {
                [styles.createRoomLinkDisabled]: isRoomJoining,
              })}
            >
              Create room
            </Button>
          </div>
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.imagesWrapper}>
            <img
              className={styles.chatImage}
              src={chatImage}
              alt="Chat image"
            />
            <div className={styles.jobImage} />
            <div className={styles.laptopImage} />
            <img className={styles.barImage} src={barImage} alt="Bar image" />
          </div>
        </div>
      </main>
      <Alerts />
    </>
  );
});

export default HomePage;
