import { observer } from "mobx-react-lite";

import useMobX from "hooks/use-mobx";

import Loader from "components/loader";
import Alerts from "components/alerts";
import Template from "components/template";

import VideoPlug from "assets/images/video-plug.svg";

import Button from "basics/button";

import Controls from "./components/controls";

import useWebRTC from "./use-web-rtc/useWebRTC";
import { setVideo } from "./duck/helpers";

import styles from "./RoomPage.module.scss";

const RoomPage = observer(() => {
  const {
    webRTC,
    main: { isLoadingPusher, pusherError, userId },
  } = useMobX();

  useWebRTC();

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
          <p className={styles.error}>Please try again.</p>
          <Button
            className={styles.reloadButton}
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload Page
          </Button>
        </div>
        <Alerts />
      </Template>
    );
  }

  return (
    <div className={styles.wrapper}>
      {Object.values(webRTC.clients).map(({ id }) => (
        <div key={id} className={styles.videoWrapper}>
          {!webRTC.clients[id].isVideo ? (
            <VideoPlug className={styles.video} />
          ) : (
            <video
              className={styles.video}
              // TODO:
              ref={node =>
                setVideo({
                  id,
                  node,
                  webRTC,
                  myId: userId as string,
                })
              }
              id={id}
              autoPlay
              playsInline
              muted={id === userId}
            />
          )}
        </div>
      ))}
      <Controls />
      <Alerts />
    </div>
  );
});

export default RoomPage;
