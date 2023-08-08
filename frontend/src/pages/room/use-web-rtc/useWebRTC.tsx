import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useMobX from "hooks/use-mobx";

import { Actions, CHANNEL, Events } from "constants/web-rtc";
import { initializePusher } from "operations/pusher";

import {
  initializeVideo,
  leaveRoom,
  onICEShare,
  onStopVideo,
  onUserRemove,
} from "./duck/helpers";

const useWebRTC = () => {
  const { roomId } = useParams();
  const { main } = useMobX();

  const pusher = main.pusher;
  const userId = main.userId as string;

  useEffect(() => {
    if (main.pusherError) {
      return;
    }

    main.roomId = roomId as string;

    if (!pusher) {
      initializePusher({
        action: Actions.joinRoom,
        roomId,
        shouldRedirect: false,
      });

      return;
    }

    main.setIsLoadingPusher(false);

    const channel = pusher.channel(CHANNEL);

    channel.bind(Events.iceCandidateShared, onICEShare);
    channel.bind(Events.userRemoved, onUserRemove);
    channel.bind(Events.userStoppedVideo, onStopVideo);

    initializeVideo({
      userId,
      roomId: roomId as string,
    });

    return () => {
      leaveRoom();
    };
  }, [roomId, pusher]);
};

export default useWebRTC;
