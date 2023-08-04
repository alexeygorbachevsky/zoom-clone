import type WebRTCStore from "../webRTCStore";

function clearState(this: WebRTCStore) {
  this.peerConnections = {};
  this.peerMediaElements = {};
  this.clients = {};
  this.remoteMediaStreams = {};
}

export default clearState;
