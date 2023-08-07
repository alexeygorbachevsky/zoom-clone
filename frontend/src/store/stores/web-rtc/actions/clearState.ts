import type WebRTCStore from "../webRTCStore";

function clearState(this: WebRTCStore) {
  this.peerConnections = {};
  this.peerMediaElements = {};
  this.clients = {};
  this.remoteMediaStreams = {};
  this.localMediaStream = null;
}

export default clearState;
