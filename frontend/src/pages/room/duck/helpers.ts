import { WebRTCState } from "store/stores/web-rtc/types";

interface SetVideo {
  id: string;
  myId: string;
  node: HTMLVideoElement | null;
  webRTC: WebRTCState;
}

export const setVideo = ({ id, node, webRTC, myId }: SetVideo) => {
  webRTC.peerMediaElements[id] = node;

  const video = webRTC.peerMediaElements[id];

  // eslint-disable-next-line
  console.log("video", video)

  if (!video) {
    return;
  }

  // eslint-disable-next-line
  console.log("id === myId", id === myId)

  if (id === myId) {
    video.volume = 0;

    // TODO: add common webRTC.mediaStreams
    video.srcObject = webRTC.localMediaStream;

    return;
  }

  webRTC.peerMediaElements[id].srcObject = webRTC.remoteStreams[id];
};
