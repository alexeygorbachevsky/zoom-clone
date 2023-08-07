import { PresenceChannel } from "pusher-js";
import freeice from "freeice";
import { v4 as uuid } from "uuid";

import { store } from "store";
import { AlertTypes } from "store/stores/alerts";

import { CHANNEL, Events } from "constants/web-rtc";

interface ICEShare {
  roomId: string;
  userId: string;
  iceCandidate: RTCIceCandidate;
}

export const onICEShare = ({ userId, iceCandidate }: ICEShare) => {
  const { webRTC } = store;

  webRTC.peerConnections[userId].addIceCandidate(
    new RTCIceCandidate(iceCandidate),
  );
};

interface OnUserRemove {
  roomId: string;
  userId: string;
}

export const leaveRoom = () => {
  const { webRTC, main } = store;

  webRTC.localMediaStream?.getTracks().forEach(track => track.stop());
  webRTC.remoteMediaStreams[main.userId as string]?.getTracks().forEach(track => track.stop());

  webRTC.clearState();
  main.setUserId(null);
  main.pusher?.disconnect();
  main.setPusher(null);
};

interface OnUserRemove {
  id: string;
}

export const onUserRemove = ({ id }: OnUserRemove) => {
  const { webRTC } = store;

  webRTC.remoteMediaStreams[id]?.getTracks().forEach(track => track.stop());
  webRTC.peerConnections[id]?.close();

  delete webRTC.peerConnections[id];
  delete webRTC.peerMediaElements[id];
  delete webRTC.clients[id];
  delete webRTC.remoteMediaStreams[id];
};

export interface SessionDescriptionShare {
  roomId: string;
  userId: string;
  sessionDescription: RTCSessionDescriptionInit;
}

export const onSessionDescriptionShare = async ({
  roomId,
  userId,
  sessionDescription,
}: SessionDescriptionShare) => {
  const {
    webRTC,
    main: { pusher },
  } = store;

  await webRTC.peerConnections[userId].setRemoteDescription(
    new RTCSessionDescription(sessionDescription),
  );

  if (sessionDescription.type === "offer") {
    const answer = await webRTC.peerConnections[userId].createAnswer();

    await webRTC.peerConnections[userId].setLocalDescription(answer);

    pusher!.send_event(
      Events.sessionDescriptionShared,
      {
        roomId,
        userId,
        sessionDescription: answer,
      },
      CHANNEL,
    );
  }
};

export interface onSocketJoin {
  roomId: string;
  userId: string;
  shouldCreateOffer?: boolean;
}

export const onSocketJoin = async ({
  roomId,
  userId: joinedUserId,
  shouldCreateOffer = false,
}: onSocketJoin) => {
  const {
    webRTC,
    main: { pusher },
  } = store;

  if (webRTC.peerConnections[joinedUserId]) {
    return;
  }

  webRTC.peerConnections[joinedUserId] = new RTCPeerConnection({
    iceServers: freeice(),
  });

  webRTC.peerConnections[joinedUserId].onicecandidate = (
    event: RTCPeerConnectionIceEvent,
  ) => {
    const iceCandidate = event.candidate;

    if (iceCandidate) {
      pusher!.send_event(
        Events.iceCandidateShared,
        {
          roomId,
          userId: joinedUserId,
          iceCandidate,
        },
        CHANNEL,
      );
    }
  };

  webRTC.peerConnections[joinedUserId].ontrack = ({
    streams: [remoteStream],
  }: RTCTrackEvent) => {
    webRTC.remoteMediaStreams[joinedUserId] = remoteStream;
    webRTC.clients[joinedUserId] = joinedUserId;
  };

  webRTC.localMediaStream?.getTracks().forEach(track => {
    webRTC.peerConnections[joinedUserId].addTrack(
      track,
      webRTC.localMediaStream,
    );
  });

  if (shouldCreateOffer) {
    const offer = await webRTC.peerConnections[joinedUserId].createOffer();

    await webRTC.peerConnections[joinedUserId].setLocalDescription(offer);

    pusher!.send_event(
      Events.sessionDescriptionShared,
      {
        roomId,
        userId: joinedUserId,
        sessionDescription: offer,
      },
      CHANNEL,
    );
  }
};

interface Member {
  id: string;
  info: { roomId: string };
}

export interface InitializeVideo {
  userId: string | null;
  roomId: string;
}

export const initializeVideo = async ({ roomId, userId }: InitializeVideo) => {
  const {
    webRTC,
    alerts,
    main: { pusher },
  } = store;

  if (!userId) {
    return;
  }

  try {
    webRTC.localMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    webRTC.clients[userId] = userId;

    const channel = pusher!.channel(CHANNEL) as PresenceChannel;

    channel.members.each(({ id, info }: Member) => {
      if (info.roomId === roomId) {
        onSocketJoin({ roomId, userId: id, shouldCreateOffer: true });
      }
    });

    pusher!.send_event(Events.userJoined, { roomId, userId }, CHANNEL);
  } catch (err) {
    alerts.addAlert({
      id: uuid(),
      message: "Video initialization error",
      type: AlertTypes.error,
      timeout: 3000,
    });
  }
};
