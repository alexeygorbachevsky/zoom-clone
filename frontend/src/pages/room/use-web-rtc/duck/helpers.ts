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

export const onICEShare = ({ userId, iceCandidate, roomId }: ICEShare) => {
  const {
    webRTC,
    main: { roomId: currentRoomId },
  } = store;

  if (currentRoomId !== roomId) {
    return;
  }

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
  webRTC.remoteMediaStreams[main.userId as string]
    ?.getTracks()
    .forEach(track => track.stop());

  webRTC.clearState();
  main.setUserId(null);
  main.pusher?.disconnect();
  main.setPusher(null);
};

interface OnUserRemove {
  id: string;
  info: { roomId: string };
}

export const onUserRemove = ({ id, info: { roomId } }: OnUserRemove) => {
  const {
    webRTC,
    main: { roomId: currentRoomId },
  } = store;

  if (roomId !== currentRoomId) {
    return;
  }

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
  sessionDescription?: RTCSessionDescriptionInit;
  shouldCreateOffer?: boolean;
}

export const onSessionDescriptionShare = async ({
  roomId,
  userId,
  sessionDescription,
  shouldCreateOffer,
}: SessionDescriptionShare) => {
  const {
    webRTC,
    main: { pusher, roomId: currentRoomId, userId: currentUserId },
  } = store;

  if (currentRoomId !== roomId) {
    return;
  }

  if (!webRTC.peerConnections[userId]) {
    webRTC.peerConnections[userId] = new RTCPeerConnection({
      // https://dashboard.metered.ca/
      iceServers: [
        ...freeice(),
        {
          urls: "stun:stun.relay.metered.ca:80",
        },
        {
          urls: "turn:a.relay.metered.ca:80",
          username: process.env.METERED_NAME,
          credential: process.env.METERED_KEY,
        },
        // {
        //   urls: "turn:a.relay.metered.ca:80?transport=tcp",
        //   username: process.env.METERED_NAME,
        //   credential: process.env.METERED_KEY,
        // },
        // {
        //   urls: "turn:a.relay.metered.ca:443",
        //   username: process.env.METERED_NAME,
        //   credential: process.env.METERED_KEY,
        // },
        // {
        //   urls: "turn:a.relay.metered.ca:443?transport=tcp",
        //   username: process.env.METERED_NAME,
        //   credential: process.env.METERED_KEY,
        // },
      ],
    });

    webRTC.peerConnections[userId].onicecandidate = (
      event: RTCPeerConnectionIceEvent,
    ) => {
      const iceCandidate = event.candidate;

      if (iceCandidate) {
        pusher!.send_event(
          Events.iceCandidateShared,
          {
            roomId,
            userId: currentUserId,
            iceCandidate,
          },
          CHANNEL,
        );
      }
    };

    // let tracksCount = 0;
    webRTC.peerConnections[userId].ontrack = ({
      streams: [remoteStream],
    }: RTCTrackEvent) => {
      // tracksCount += 1;

      // if (tracksCount === 2) {
      webRTC.remoteMediaStreams[userId] = remoteStream;
      webRTC.clients[userId] = {
        id: userId,
        isVideo: true,
        isAudio: true,
      };
      // }
    };

    webRTC.localMediaStream?.getTracks().forEach(track => {
      webRTC.peerConnections[userId].addTrack(track, webRTC.localMediaStream);
    });
  }

  if (shouldCreateOffer) {
    const offer = await webRTC.peerConnections[userId].createOffer();

    pusher!.send_event(
      Events.sessionDescriptionShared,
      {
        roomId,
        userId: currentUserId,
        sessionDescription: offer,
      },
      CHANNEL,
    );

    await webRTC.peerConnections[userId].setLocalDescription(offer);

    return;
  }

  await webRTC.peerConnections[userId].setRemoteDescription(
    new RTCSessionDescription(sessionDescription!),
  );

  if (sessionDescription?.type === "offer") {
    const answer = await webRTC.peerConnections[userId].createAnswer();

    pusher!.send_event(
      Events.sessionDescriptionShared,
      {
        roomId,
        userId: currentUserId,
        sessionDescription: answer,
      },
      CHANNEL,
    );

    await webRTC.peerConnections[userId].setLocalDescription(answer);
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

    webRTC.clients[userId] = { id: userId, isVideo: true, isAudio: true };

    const channel = pusher!.channel(CHANNEL) as PresenceChannel;

    if (channel.members.count === 1) {
      return;
    }

    channel.members.each(({ id, info }: Member) => {
      if (info.roomId === roomId && userId !== id) {
        onSessionDescriptionShare({
          roomId,
          userId: id,
          shouldCreateOffer: true,
        });
      }
    });
  } catch (err) {
    alerts.addAlert({
      id: uuid(),
      message:
        "Video initialization error. Possibly you have blocked camera or micro",
      type: AlertTypes.error,
      timeout: 5000,
    });
  }
};

interface Member {
  id: string;
  isVideo: boolean;
  roomId: string;
}

export const onStopVideo = ({ id, isVideo, roomId }: Member) => {
  const {
    webRTC,
    main: { roomId: currentRoomId },
  } = store;

  if (currentRoomId !== roomId) {
    return;
  }

  webRTC.clients[id].isVideo = isVideo;
};
