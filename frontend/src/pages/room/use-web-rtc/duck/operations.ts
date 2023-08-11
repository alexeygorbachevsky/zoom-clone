import { PresenceChannel } from "pusher-js";
import { v4 as uuid } from "uuid";

import { store } from "store";
import { AlertTypes } from "store/stores/alerts";

import { CHANNEL, Events } from "constants/web-rtc";
import { ICE_SERVERS } from "./constants";

interface ICEShare {
  roomId: string;
  userId: string;
  receiverId: string;
  iceCandidate?: RTCIceCandidate;
  sdp?: RTCSessionDescription;
  shouldCreateOffer?: boolean;
}

// create offer -> set local -> set remote -> create answer -> set local -> set remote
export const onICEShare = async ({
  userId,
  receiverId,
  roomId,
  shouldCreateOffer,
  iceCandidate,
  sdp,
}: ICEShare) => {
  const {
    webRTC,
    main: { roomId: currentRoomId, userId: currentUserId, pusher },
  } = store;

  if (currentRoomId !== roomId || receiverId !== currentUserId) {
    return;
  }

  const sessionDescription = {} as { current: RTCSessionDescriptionInit };

  if (!webRTC.peerConnections[userId]) {
    webRTC.peerConnections[userId] = new RTCPeerConnection({
      iceServers: ICE_SERVERS,
    });

    // if (userId !== receiverId) {
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
            receiverId: userId,
            iceCandidate,
            sdp: sessionDescription.current,
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
      webRTC.peerConnections[userId].addTrack(track, webRTC.localMediaStream!);
    });
    // }
  }

  if (shouldCreateOffer) {
    const offer = await webRTC.peerConnections[userId].createOffer();

    sessionDescription.current = offer;

    await webRTC.peerConnections[userId].setLocalDescription(offer);

    return;
  }

  if (sdp) {
    await webRTC.peerConnections[userId].setRemoteDescription(
      new RTCSessionDescription(sdp),
    );
  }

  if (iceCandidate) {
    webRTC.peerConnections[userId].addIceCandidate(
      new RTCIceCandidate(iceCandidate),
    );
  }

  if (sdp?.type === "offer") {
    const answer = await webRTC.peerConnections[userId].createAnswer();

    sessionDescription.current = answer;

    await webRTC.peerConnections[userId].setLocalDescription(answer);
  }
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
      if (info.roomId === roomId) {
        onICEShare({
          roomId,
          userId: id,
          receiverId: userId,
          shouldCreateOffer: id !== userId,
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
