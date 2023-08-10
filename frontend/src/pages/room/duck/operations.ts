import { WebRTCState } from "store/stores/web-rtc/types";

interface SetVideo {
  id: string;
  myId: string;
  node: HTMLVideoElement | null;
  webRTC: WebRTCState;
}

export const setVideo = ({ id, node, webRTC, myId }: SetVideo) => {
  if (!node) {
    return;
  }

  webRTC.peerMediaElements[id] = node;

  const video = webRTC.peerMediaElements[id];

  if (id === myId) {
    video.volume = 0;
    video.srcObject = webRTC.localMediaStream;

    return;
  }

  video.srcObject = webRTC.remoteMediaStreams[id];
};
