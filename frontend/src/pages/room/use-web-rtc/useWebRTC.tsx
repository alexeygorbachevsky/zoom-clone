import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useMobX from "hooks/use-mobx";

import { Actions, CHANNEL, Events } from "constants/web-rtc";
import { initializePusher } from "operations/pusher";

import {
  initializeVideo,
  onICEShare,
  onSessionDescriptionShare,
  onSocketJoin,
  onUserRemove,
} from "./duck/helpers";

type UseParams = {
  roomId: string;
};

const useWebRTC = () => {
  const { roomId } = useParams() as UseParams;
  const { webRTC, main } = useMobX();

  const pusher = main.pusher;
  const userId = main.userId;

  useEffect(() => {
    if (!pusher) {
      initializePusher({ action: Actions.joinRoom, roomId, shouldRedirect: false });

      return;
    }

    main.setIsLoadingPusher(false);

    const channel = pusher.channel(CHANNEL);

    channel.bind(Events.userJoined, onSocketJoin);
    channel.bind(Events.sessionDescriptionShared, onSessionDescriptionShare);
    channel.bind(Events.iceCandidateShared, onICEShare);
    channel.bind(Events.userRemoved, onUserRemove);

    initializeVideo({
      userId,
      roomId,
    });

    return () => {
      webRTC.localMediaStream?.getTracks().forEach(track => track.stop());

      pusher?.disconnect();
      webRTC.clearState();
      main.setPusher(null);
      main.setUserId(null);

      if (pusher) {
        // TODO: try without this event
        pusher.send_event(Events.userRemoved, { roomId, userId }, CHANNEL);
      }
    };
  }, [roomId, pusher]);
};

export default useWebRTC;
