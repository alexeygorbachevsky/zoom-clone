import { observer } from "mobx-react-lite";

import { useMobX } from "hooks";

import { Loader } from "components";

import { useWebRTC } from "./duck/hooks";
import { setVideo } from "./duck/helpers";

import styles from "./RoomPage.module.scss";

const { wrapper } = styles;

// TODO: handle refresh page when socket already connected
// TODO: validate roomId via backend

const RoomPage = observer(() => {
  const { webRTC, main } = useMobX();

  const userId = main.userId as string;

  useWebRTC();

  if (!main.pusher) {
    return (
      <div className={wrapper}>
        <Loader />
      </div>
    );
  }

  // TODO: error state + alert
  if (main.pusherError || !userId) {
    return <div className={wrapper}>Error!</div>;
  }

  return (
    <div className={wrapper}>
      {Object.values(webRTC.clients).map(id => (
        <div key={id}>
          <video
            ref={node => setVideo({ id, node, webRTC, myId: userId })}
            id={id}
            autoPlay
            playsInline
            muted={id === userId}
          ></video>
        </div>
      ))}
    </div>
  );
});

export default RoomPage;
