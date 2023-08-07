import { observer } from "mobx-react-lite";
import classnames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import MicrophoneIcon from "assets/icons/microphone.svg";
import CameraIcon from "assets/icons/camera.svg";
import CopyIcon from "assets/icons/copy.svg";

import { AlertTypes } from "store/stores/alerts";

import useMobX from "hooks/use-mobx";

import { ROUTES } from "constants/routes";

import { leaveRoom } from "../../use-web-rtc/duck/helpers";

import styles from "./Controls.module.scss";

const Controls = observer(() => {
  const { roomId } = useParams();
  const { main, webRTC, alerts } = useMobX();
  const navigate = useNavigate();

  const { isAudio, isVideo } = main;

  const onMute = () => {
    webRTC.localMediaStream!.getAudioTracks()[0].enabled = !isAudio;
    main.setIsAudio(!isAudio);
  };

  const onStopVideo = () => {
    webRTC.localMediaStream!.getVideoTracks()[0].enabled = !isVideo;
    main.setIsVideo(!isVideo);
  };

  const onLeaveRoom = () => {
    leaveRoom();
    navigate(ROUTES.home);
  };

  const onCopyLink = () => {
    navigator.clipboard.writeText(roomId as string);
    alerts.addAlert({
      type: AlertTypes.success,
      id: uuid(),
      message: "Room id successfully copied",
      timeout: 2000,
    });
  };

  return (
    <div className={styles.wrapper}>
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
      <button
        className={classnames(styles.controlButton, styles.copyButton)}
        onClick={onCopyLink}
      >
        <CopyIcon className={styles.icon} />
        Copy room id
      </button>
      <button className={styles.leaveRoomButton} onClick={onLeaveRoom}>
        Leave Room
      </button>
    </div>
  );
});

export default Controls;
