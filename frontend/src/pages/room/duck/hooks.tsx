import { useEffect } from "react";
import freeice from "freeice";

import { useMobX } from "hooks";

import getPusher from "helpers/pusher";

import { CHANNEL, EVENTS } from "constants/web-rtc";
import getRoomUsers from "api/getRoomUsers";

interface Props {
  roomId: string;
  userId: string;
}

interface UserJoined {
  roomId: string;
  userId: string;
  shouldCreateOffer?: boolean;
}

interface SessionDescriptionShare {
  roomId: string;
  userId: string;
  sessionDescription: RTCSessionDescriptionInit;
}

interface ICEShare {
  roomId: string;
  userId: string;
  iceCandidate: RTCIceCandidate;
}

interface OnUserRemove {
  roomId: string;
  userId: string;
}

export const useWebRTC = ({ roomId, userId }: Props) => {
  const { webRTC, main } = useMobX();

  const authPusher = main.pusher;

  const initializeVideo = async () => {
    try {
      webRTC.localMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      webRTC.clients[userId] = userId;
      // eslint-disable-next-line
      console.log("EVENTS.userJoined have sent");

      const roomUserIds = await getRoomUsers(roomId);

      roomUserIds.forEach(roomUserId => {
        onSocketJoin({ roomId, userId: roomUserId, shouldCreateOffer: true });
      });

      authPusher!.send_event(EVENTS.userJoined, { roomId, userId }, CHANNEL);
    } catch (err) {
      // TODO: handle
      // eslint-disable-next-line
      console.log("initializeVideo error", err);
    }
  };

  const onSocketJoin = async ({
    roomId,
    userId: joinedUserId,
    shouldCreateOffer = false,
  }: UserJoined) => {
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
        authPusher!.send_event(
          EVENTS.iceCandidateShared,
          {
            roomId,
            userId: joinedUserId,
            iceCandidate,
          },
          CHANNEL,
        );
      }
    };

    // we should audio + video
    let tracksCount = 0;
    webRTC.peerConnections[joinedUserId].ontrack = ({
      streams: [remoteStream],
    }: RTCTrackEvent) => {
      tracksCount += 1;

      // eslint-disable-next-line
      console.log("tracksCount", tracksCount);
      // eslint-disable-next-line
      console.log("joinedUserId", joinedUserId);

      if (tracksCount === 2) {
        webRTC.remoteStreams[joinedUserId] = remoteStream;
        webRTC.clients[joinedUserId] = joinedUserId;
      }
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

      authPusher!.send_event(
        EVENTS.sessionDescriptionShared,
        {
          roomId,
          userId: joinedUserId,
          sessionDescription: offer,
        },
        CHANNEL,
      );
    }
  };

  const onSessionDescriptionShare = async ({
    roomId,
    userId,
    sessionDescription,
  }: SessionDescriptionShare) => {
    // eslint-disable-next-line
    console.log(
      "onSessionDescriptionShare",
      "webRTC.peerConnections, senderId",
      { ...webRTC.peerConnections },
      userId,
    );
    await webRTC.peerConnections[userId].setRemoteDescription(
      new RTCSessionDescription(sessionDescription),
    );

    if (sessionDescription.type === "offer") {
      const answer = await webRTC.peerConnections[userId].createAnswer();

      await webRTC.peerConnections[userId].setLocalDescription(answer);

      authPusher!.send_event(
        EVENTS.sessionDescriptionShared,
        {
          roomId,
          userId,
          sessionDescription: answer,
        },
        CHANNEL,
      );
    }
  };

  const onSocketRemove = ({ userId }: OnUserRemove) => {
    webRTC.peerConnections[userId]?.close();

    delete webRTC.peerConnections[userId];
    delete webRTC.peerMediaElements[userId];
    delete webRTC.clients[userId];
  };

  const onICEShare = ({ userId, iceCandidate }: ICEShare) => {
    webRTC.peerConnections[userId].addIceCandidate(
      new RTCIceCandidate(iceCandidate),
    );
  };

  useEffect(() => {
    if (!authPusher) {
      const pusher = getPusher({ roomId, userId });

      pusher.connection.bind("connected", (data: never) => {
        // eslint-disable-next-line no-console
        console.log("Connected in room", JSON.stringify(data));

        const channel = pusher.subscribe(CHANNEL);

        // eslint-disable-next-line no-console
        console.log("channel", channel);

        // eslint-disable-next-line
        channel.bind("pusher:subscription_succeeded", (data: any) => {
          // eslint-disable-next-line no-console
          console.log("pusher:subscription_succeeded", data);

          main.setPusher(pusher);
          main.setUserId(data.me.id);
        });

        channel.bind("pusher:subscription_error", () => {
          // eslint-disable-next-line no-console
          console.log("Subscription error");

          // TODO: set Error
          pusher.disconnect();

          main.setPusher(null);
          main.setUserId(null);
        });
      });

      pusher.connection.bind("error", (err: Error) => {
        // eslint-disable-next-line no-console
        console.log("Error", err);

        // TODO: set Error

        pusher.disconnect();

        main.setPusher(null);
        main.setUserId(null);
      });
    }
  }, []);

  useEffect(() => {
    if (!authPusher) {
      return;
    }

    // eslint-disable-next-line no-console
    console.log("EVENTS.userJoined bind");
    // eslint-disable-next-line
    console.log("authPusher.channel(CHANNEL)", authPusher.channel(CHANNEL));

    const channel = authPusher.channel(CHANNEL);

    channel.bind(EVENTS.userJoined, onSocketJoin);

    channel.bind(EVENTS.sessionDescriptionShared, onSessionDescriptionShare);
    channel.bind(EVENTS.iceCandidateShared, onICEShare);
    channel.bind(EVENTS.userRemoved, onSocketRemove);

    return () => {
      authPusher?.disconnect();

      // TODO: add separate funcs
      webRTC.peerConnections = {};
      webRTC.peerMediaElements = {};
      webRTC.clients = {};
      webRTC.remoteStreams = {};
      webRTC.localMediaStream = null;

      main.pusher = null;
      main.userId = null;
      // localStorageUtil.remove(localStorageUtil.keys.userId);
    };
  }, [authPusher]);

  useEffect(() => {
    if (!authPusher) {
      return;
    }

    initializeVideo();

    return () => {
      webRTC.localMediaStream?.getTracks().forEach(track => track.stop());

      // TODO   getPusher({ roomId, existedSocketId: socketId })
      if (!authPusher) {
        //

        return;
      }

      authPusher.send_event(EVENTS.userRemoved, { roomId, userId }, CHANNEL);
    };
  }, [roomId, authPusher]);
};
