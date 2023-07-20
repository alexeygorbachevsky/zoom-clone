import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useMobX } from "hooks";

import { Loader } from "components";

import { useWebRTC } from "./duck/hooks";
import { setVideo } from "./duck/helpers";

import styles from "./RoomPage.module.scss";
import localStorageUtil from "../../operations/localStorage";
import localStorage from "../../operations/localStorage";

const { wrapper } = styles;

type UseParams = {
  roomId: string;
};

// TODO: handle refresh page when socket already connected
// TODO: validate roomId via backend

const RoomPage = observer(() => {
  const { roomId } = useParams() as UseParams;
  const { webRTC, main } = useMobX();

  const userId =
    main.userId || (localStorageUtil.get(localStorage.keys.userId) as string);

  useWebRTC({ roomId, userId });

  // TODO: error state + alert
  if (main.pusherError || !main.userId) {
    return <div className={wrapper}>Error!</div>;
  }

  if (!main.pusher) {
    return (
      <div className={wrapper}>
        <Loader />
      </div>
    );
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
