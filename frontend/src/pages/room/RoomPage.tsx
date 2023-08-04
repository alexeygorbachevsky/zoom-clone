import { observer } from "mobx-react-lite";
import classnames from "classnames";

import MicrophoneIcon from "assets/icons/microphone.svg";
import CameraIcon from "assets/icons/camera.svg";

import useMobX from "hooks/use-mobx";

import Loader from "components/loader";
import Alerts from "components/alerts";
import Template from "components/template";

import useWebRTC from "./use-web-rtc/useWebRTC";
import { setVideo } from "./duck/helpers";

import styles from "./RoomPage.module.scss";

const RoomPage = observer(() => {
  const { webRTC, main } = useMobX();

  const { isLoadingPusher, pusherError, userId, isAudio, isVideo } = main;

  useWebRTC();

  const onMute = () => {
    main.setIsAudio(!isAudio);
  };

  const onStopVideo = () => {
    main.setIsVideo(!isVideo);
  };

  if (isLoadingPusher) {
    return (
      <div className={styles.wrapper}>
        <Loader />
      </div>
    );
  }

  if (pusherError) {
    return (
      <Template>
        <div className={styles.errorWrapper}>
          <p className={styles.error}>Error is occurred!</p>
        </div>
        <Alerts />
      </Template>
    );
  }

  return (
    <div className={styles.wrapper}>
      {Object.values(webRTC.clients).map(id => (
        <div key={id}>
          <video
            className={styles.video}
            ref={node => setVideo({ id, node, webRTC, myId: userId as string })}
            id={id}
            autoPlay
            playsInline
            muted={id === userId}
          />
        </div>
      ))}
      {/* TODO: move to separate component to avoid unnecessary renders of videos*/}
      <div className={styles.videoControls}>
        <button
          className={classnames(styles.controlButton, styles.muteButton, {
            [styles.controlButtonMuted]: !isAudio,
          })}
          onClick={onMute}
        >
          <MicrophoneIcon className={styles.icon} />
          Mute
        </button>
        <button
          className={classnames(styles.controlButton, styles.stopButton, {
            [styles.controlButtonMuted]: !isVideo,
          })}
          onClick={onStopVideo}
        >
          <CameraIcon className={styles.icon} />
          Stop video
        </button>
        <button className={styles.leaveRoomButton}>Leave Room</button>
      </div>
    </div>
  );
});

export default RoomPage;
