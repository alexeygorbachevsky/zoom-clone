//  TODO
export interface WebRTCState {
  clients: Record<string, string>;
  // eslint-disable-next-line
  peerConnections: Record<string, any>;
  // eslint-disable-next-line
  peerMediaElements: Record<string, any>;
  remoteMediaStreams: Record<string, MediaStream | null>;
  localMediaStream: MediaStream | null;
}
