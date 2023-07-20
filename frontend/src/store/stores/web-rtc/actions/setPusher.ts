import type WebRTCStore from "../webRTCStore";

function setPusher(this: WebRTCStore, payload: never) {
  this.peerConnections = payload;
}

export default setPusher;
