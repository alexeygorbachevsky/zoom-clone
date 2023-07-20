//  TODO
export interface WebRTCState {
  clients: Record<string, string>;
  peerConnections: Record<string, any>;
  localMediaStream: MediaStream | null;
  peerMediaElements: Record<string, any>;
  remoteStreams: Record<string, any>;
}
