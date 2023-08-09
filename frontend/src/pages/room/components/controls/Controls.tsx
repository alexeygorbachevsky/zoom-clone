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
import { CHANNEL, Events } from "constants/web-rtc";

import { leaveRoom } from "../../use-web-rtc/duck/helpers";

import styles from "./Controls.module.scss";

const Controls = observer(() => {
  const { roomId } = useParams();
  const { main, webRTC, alerts } = useMobX();
  const navigate = useNavigate();

  const userId = main.userId as string;
  const user = webRTC.clients[userId];

  if (!user) {
    return null;
  }

  const onMute = () => {
    webRTC.localMediaStream!.getAudioTracks()[0].enabled = !user.isAudio;
    user.isAudio = !user.isAudio;
  };

  const onStopVideo = () => {
    webRTC.localMediaStream!.getVideoTracks()[0].enabled = !user.isVideo;
    webRTC.localMediaStream!.getAudioTracks()[0].enabled = true;
    user.isVideo = !user.isVideo;
    main.pusher!.send_event(
      Events.userStoppedVideo,
      { id: main.userId, isVideo: user.isVideo, roomId },
      CHANNEL,
    );
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
      message: "Room id copied",
      timeout: 3000,
    });
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={classnames(styles.controlButton, styles.muteButton, {
          [styles.controlButtonMuted]: !user.isAudio,
        })}
        onClick={onMute}
      >
        <MicrophoneIcon className={styles.icon} />
        Mute
      </button>
      <button
        className={classnames(styles.controlButton, styles.stopButton, {
          [styles.controlButtonMuted]: !user.isVideo,
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
